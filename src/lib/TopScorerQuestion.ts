import { goalsByMatchId } from '../data/worldcup';
import { Utils } from "../utils/Utils";
import { GoalUtils } from '../utils/GoalUtils';
import type { QuizQuestion } from '../types/QuizQuestion';
import { WinnerQuestion } from './WinnerQuestion';
import { MatchesService } from '../service/MatchesService';

const matchesService = new MatchesService();
export const TopScorerQuestion = {

    generateTopScorerQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {

        const goalsByYearAndPlayer: Record<string, Record<string, number>> = {};

        matchesService.getMatches().forEach(match => {
            const year = Utils.getYearByTournamentId(match.tournament_id);
            const matchGoals = goalsByMatchId.get(String(match.match_id)) || [];

            matchGoals.forEach(goal => {
                const player = GoalUtils.getScorerName(goal);
                if (player != '' && !goal.own_goal) {
                    if (!goalsByYearAndPlayer[year]) goalsByYearAndPlayer[year] = {};
                    goalsByYearAndPlayer[year][player] = (goalsByYearAndPlayer[year][player] || 0) + 1;
                }
            });
        });

        const years = Object.keys(goalsByYearAndPlayer);
        console.log('Valid years with scorers:', years.length);

        if (years.length === 0) {
            console.warn('No years with scorers found - falling back');
            return WinnerQuestion.generateWinnerQuestion(t);
        }

        const year = Utils.getRandomItem(years);
        const scorers = goalsByYearAndPlayer[year];

        if (Object.keys(scorers).length === 0) {
            return WinnerQuestion.generateWinnerQuestion(t);
        }

        let maxGoals = 0;

        maxGoals = Math.max(...Object.values(scorers));
        const topScorers = Object.entries(scorers)
            .filter(([, goals]) => goals === maxGoals)
            .map(([player]) => player);

        const correctAnswer = topScorers[0]; // pick first if tie

        // Wrong answers: other players + "None" (always included for trickery)
        const otherPlayers = Object.keys(scorers).filter(p => p !== correctAnswer);
        const uniqueWrong = Array.from(new Set(otherPlayers));

        if (uniqueWrong.length < 3) {
            return WinnerQuestion.generateWinnerQuestion(t);
        }

        const wrongPlayers = Utils.shuffleArray(uniqueWrong).slice(0, 3);
        const options = Utils.shuffleArray([correctAnswer, ...wrongPlayers]);

        return {
            question: t('questions.topScorer', { year }),
            options,
            correctAnswerIndex: options.indexOf(correctAnswer),
            difficulty: 'medium',
            category: 'Goal Scorers',
        };
    }
}