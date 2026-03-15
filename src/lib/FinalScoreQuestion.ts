import { WorldCupService } from "../service/worldCupService";
import type { QuizQuestion } from "../types/QuizQuestion";
import { Constants } from "../utils/Constants";
import { MatchUtils } from "../utils/MatchUtils";
import { Utils } from "../utils/Utils";
import { WinnerQuestion } from "./WinnerQuestion";

const worldCupService = new WorldCupService();

export const FinalScoreQuestion = {
    generateFinalScoreQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {
    const finals = worldCupService.getFinals();
    if (finals.length < 4) return WinnerQuestion.generateWinnerQuestion(t); // safety

    // Pick 4 different finals
    const selectedFinals = Utils.shuffleArray(finals).slice(0, 4);
    const correctMatch = selectedFinals[0];
    const year = correctMatch.tournament_name.replace(Constants.WORLD_CUP_REGEX, '');

    const correctAnswer = `${correctMatch.home_team_name} ${correctMatch.home_team_score} - ${correctMatch.away_team_score} ${correctMatch.away_team_name}`;

    const options = selectedFinals.map(m => 
        `${m.home_team_name} ${m.home_team_score} - ${m.away_team_score} ${m.away_team_name}`
    );

    // Shuffle so correct can be anywhere
    const shuffledOptions = Utils.shuffleArray(options);
    const correctIndex = shuffledOptions.indexOf(correctAnswer);
    const winner = MatchUtils.getWinner(correctMatch);
    return {
        question: t('questions.finalScore', { year }),
        options: shuffledOptions,
        correctAnswerIndex: correctIndex,
        explanation: t('questions.explanationWinner', {winner, year}),
        difficulty: 'medium',
        category: 'Finals',
    };
    }
}