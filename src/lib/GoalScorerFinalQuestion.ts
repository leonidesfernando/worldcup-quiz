import { Constants } from '../utils/Constants';
import { goalsByMatchId } from "../data/worldcup";
import type { QuizQuestion } from "../types/QuizQuestion";
import { GoalUtils } from "../utils/GoalUtils";
import { Utils } from "../utils/Utils";
import { WorldCupService } from '../service/worldCupService';
//import { MatchesService } from '../service/MatchesService';
import type { Goal, Match } from '../types/worldcup';
import { LangUtils } from '../utils/LangUtils';
import { createMatchesService } from '../service/factory/MatchesServiceFactory';
import { WinnerQuestion } from './WinnerQuestion';

const worldCupService = new WorldCupService();
const matchesService = createMatchesService();

function getYear(finalMatch: Match): string {
    return finalMatch.tournament_name.replace(Constants.WORLD_CUP_REGEX, '');
}

export const NumberOfGoalsFinalQuestion = {
    generateTotalGoalsScoredFinalQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {
        const finals = matchesService.getFinals();

        const finalMatch = Utils.getRandomItem(finals);
        const year = getYear(finalMatch);
        const numberOfGoals = finalMatch.home_team_score + finalMatch.away_team_score;
        const wrongValues = new Set<number>();
        let i = 0;
        while (i < 6) {
            i++;
            wrongValues.add(Utils.randomNumber(numberOfGoals, 0, numberOfGoals+1));
            if(numberOfGoals -1 <= 0)
                wrongValues.add(Utils.randomNumber(numberOfGoals, 0, numberOfGoals+6+i));
        }

        const uniqueWrong = Array.from(new Set(wrongValues)).slice(0, 3);

        // Final options: correct scorer + 3 wrongs from same team/match
        const options = Utils.shuffleArray([numberOfGoals, ...uniqueWrong]).map(String);

        return {
            question: t('questions.totalFinalGoalsScored', {
                year,
                team: LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, finalMatch.home_team_code)),
                awayTeam: LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, finalMatch.away_team_code))
            }),
            options,
            correctAnswerIndex: options.indexOf(numberOfGoals.toString()),
            difficulty: t('quiz.difficultyHard'),
            difficultyClass: 'hard',
            category: t('quiz.categoryGoalScorers'),
        };
    }
}


export const FirstGoalScorerFinalQuestion = {
    generateFirstGoalScorerFinalQuestion(
        t: (key: string, params?: Record<string, any>) => string
    ): QuizQuestion {

        const allFinals = matchesService.getFinals();

        // Try up to 12 times to find a final that actually has recorded goals
        for (let attempt = 0; attempt < 12; attempt++) {
            const finalMatch = Utils.getRandomItem(allFinals);

            // Optional: still skip obvious 0-0, but don't rely only on this
            if (finalMatch.score === '0–0') {
                continue;
            }

            const year = getYear(finalMatch);

            const matchGoals = goalsByMatchId.get(finalMatch.match_id) || [];

            // STRICT filter: only real player goals (no own goals)
            const validGoals = matchGoals
                .filter((g: Goal) => GoalUtils.getScorerName(g) && !g.own_goal)
                .sort((a, b) => a.minute_regulation - b.minute_regulation);

            if (validGoals.length === 0) {
                continue; // This final has no usable goal data → try another one
            }

            // We have at least one valid goal
            const goal = validGoals[0];
            const scorer = GoalUtils.getScorerName(goal);
            if (!scorer) continue;

            const teamName = LangUtils.getCountyName(
                year,
                LangUtils.getCountryNameByi18n(t, finalMatch.home_team_code)
            );

            const awayTeamName = LangUtils.getCountyName(
                year,
                LangUtils.getCountryNameByi18n(t, finalMatch.away_team_code)
            );

            // Build wrong scorers
            const wrongScorers: string[] = matchGoals
                .filter((g: Goal) => GoalUtils.getScorerName(g) !== scorer && !g.own_goal)
                .map((g: Goal) => GoalUtils.getScorerName(g))
                .filter(Boolean);

            // Fallback: scorers from same team in the whole tournament
            let attempt:number = 0;
            while (wrongScorers.length < 3 && attempt < 3) {
                attempt++;
                const sameTeamGoals = worldCupService.getGoals().filter((g: Goal) =>
                    (g.team_name === finalMatch.home_team_name ||
                        g.team_id === finalMatch.home_team_code) &&
                    GoalUtils.getScorerName(g) !== scorer &&
                    !g.own_goal
                );

                wrongScorers.push(
                    ...sameTeamGoals.map((g) => GoalUtils.getScorerName(g)).filter(Boolean) as string[]
                );
            }

            const uniqueWrong = Array.from(new Set(wrongScorers)).slice(0, 3);
            const options = Utils.shuffleArray([scorer, ...uniqueWrong]);

            return {
                question: t('questions.firstFinalGoalScorer', {
                    year,
                    team: teamName,
                    awayTeam: awayTeamName
                }),
                options,
                correctAnswerIndex: options.indexOf(scorer),
                difficulty: t('quiz.difficultyHard'),
                difficultyClass: 'hard',
                category: t('quiz.categoryGoalScorers')
            };
        }

        // Final safety net
        console.warn('FirstGoalScorerFinalQuestion failed to find any valid final with goals → fallback');
        return WinnerQuestion.generateWinnerQuestion(t);
    }
}