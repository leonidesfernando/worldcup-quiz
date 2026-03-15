import { WorldCupService } from "../service/worldCupService";
import type { QuizQuestion } from "../types/QuizQuestion";
import { Utils } from "../utils/Utils";
import { FinalScoreQuestion } from "./FinalScoreQuestion";

const worldCupService = new WorldCupService();

export const WinnerQuestion = {

    generateWinnerQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {
    const tournament = worldCupService.getRandomTournament();//  Utils.getRandomItem(mensTournaments);
    const year = tournament.year;
    const rawWinner = tournament.winner?.trim() || null;

    let correctAnswer: string;
    let explanationKey: string;

    if (rawWinner && rawWinner !== '') {
        // Normal case: clear winner
        correctAnswer = rawWinner;
        explanationKey = 'questions.explanationWinner';
    } else {
        // Draw / no winner case
        correctAnswer = t('quiz.draw');  // e.g. "Draw", "Empate", "Empate"
        explanationKey = 'questions.explanationDraw'; // e.g. "The final ended in a draw." or "Resolved by replay/coin toss."
    }

    // Get unique possible answers (winners + "Draw" if needed)
    const possibleAnswers = new Set<string>(worldCupService.getTournaments()
        .map(mt => mt.winner?.trim() || t('quiz.draw'))
        .filter(Boolean)
        .sort(() => Math.random() - 0.5)
    );

    // Remove the correct one to generate wrongs
    possibleAnswers.delete(correctAnswer);

    const uniqueWrongAnswers = Array.from(possibleAnswers);
    if (uniqueWrongAnswers.length < 3) {
        // Very rare — fallback
        return FinalScoreQuestion.generateFinalScoreQuestion(t);
    }

    // Pick 3 different wrong answers
    const wrongAnswers = Utils.shuffleArray(uniqueWrongAnswers).slice(0, 3);

    // All options
    const options = Utils.shuffleArray([correctAnswer, ...wrongAnswers]);

    return {
        question: t('questions.winner', { year }),
        options,
        correctAnswerIndex: options.indexOf(correctAnswer),
        explanation: t(explanationKey, { 
        year,
        winner: correctAnswer === t('quiz.draw') ? t('quiz.draw') : correctAnswer 
        }),
        difficulty: correctAnswer === t('quiz.draw') ? 'hard' : 'easy', // draws are harder
        category: 'Winners',
    };
    }
}