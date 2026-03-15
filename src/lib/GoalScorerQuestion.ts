import { Constants } from './../utils/Constants';
import { goalsByMatchId } from "../data/worldcup";
import type { QuizQuestion } from "../types/QuizQuestion";
import type { Goal } from "../types/worldcup";
import { GoalUtils } from "../utils/GoalUtils";
import { Utils } from "../utils/Utils";
import { BestPlayerQuestion } from "./BestPlayerQuestion";
import { WinnerQuestion } from "./WinnerQuestion";
import { WorldCupService } from '../service/worldCupService';

const worldCupService = new WorldCupService();
export const GoalScorerQuestion = {
    generateGoalScorerQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {
    const finals = worldCupService.getFinals();
    if (finals.length === 0) {
        return WinnerQuestion.generateWinnerQuestion(t);
    }

    const finalMatch = Utils.getRandomItem(finals);
    const year = finalMatch.tournament_name.replace(Constants.WORLD_CUP_REGEX, '');

    const matchGoals = goalsByMatchId.get(finalMatch.match_id) || [];

    // Valid goals: real scorers, no own goals
    const validGoals = matchGoals.filter((g: Goal) => {
        const name = GoalUtils.getScorerName(g);
        return name && name.trim() !== '' && !g.own_goal;
    });

    if (validGoals.length === 0) {
        return BestPlayerQuestion.generateBestPlayerQuestion(t);
    }

    const goal = Utils.getRandomItem(validGoals);
    const scorer = GoalUtils.getScorerName(goal);
    const teamName = goal.team_name || goal.team_id;

    // Step 1: Try to get other scorers from the SAME FINAL (same match)
    let wrongScorers = matchGoals
        .filter(g => GoalUtils.getScorerName(g) !== scorer && !g.own_goal)
        .map(g => GoalUtils.getScorerName(g))
        .filter(Boolean);

    // Step 2: If not enough (e.g. low-scoring final), get other scorers from the SAME TEAM in the WHOLE TOURNAMENT
    if (wrongScorers.length < 3) {
        const sameTeamGoalsInTournament = worldCupService.getGoals().filter(g => 
        (g.team_name === teamName || g.team_id === teamName) &&
        GoalUtils.getScorerName(g) !== scorer &&
        !g.own_goal
        );

        wrongScorers = sameTeamGoalsInTournament
        .map(g => GoalUtils.getScorerName(g))
        .filter(Boolean);
    }

    // Step 3: Deduplicate and take up to 3
    const uniqueWrong = Array.from(new Set(wrongScorers)).slice(0, 3);


    // Final options: correct scorer + 3 wrongs from same team/match
    const options = Utils.shuffleArray([scorer, ...Utils.addWrongOptions(uniqueWrong,t)]);

    return {
        question: t('questions.goalScorer', { 
        year, 
        team: teamName 
        }),
        options,
        correctAnswerIndex: options.indexOf(scorer),
        explanation: t('questions.explanationScorer', { 
        scorer, 
        team: teamName, 
        year 
        }),
        difficulty: 'hard', // now really challenging
        category: 'Goal Scorers',
    };
    }   
}