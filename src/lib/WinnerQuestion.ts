import { isStage, randomSort } from "../filters/filters";
import { createMatchesService } from "../service/factory/MatchesServiceFactory";
import type { QuizQuestion } from "../types/QuizQuestion";
import { LangUtils } from "../utils/LangUtils";
import { MatchUtils } from "../utils/MatchUtils";
import { Utils } from "../utils/Utils";
import { FinalScoreQuestion } from "./FinalScoreQuestion";

const matchService = createMatchesService();

export const WinnerQuestion = {

    generateWinnerQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {

        const finalMatch = Utils.getRandomItem(matchService.getFinals().filter(m => isStage(m, 'final')));
        const year = Utils.getYearByTournamentId(finalMatch.tournament_id);
        const countryWinnerCode = MatchUtils.getWinnerCountryCode(finalMatch);

        const winnerCountryCode = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, countryWinnerCode));
        const correctAnswer: string = LangUtils.getCountyName(year + '', winnerCountryCode);

        let games = matchService.getFinals();
        games.push(...matchService.getSemiFinals());
        games = Utils.shuffleArray(games)

        const possibleAnswers = [...new Set(games
            .map(g => LangUtils.getCountyName(year + '', LangUtils.getCountryNameByi18n(t, MatchUtils.getWinnerCountryCode(g))))
        )].sort(randomSort);
        // Get unique possible answers (winners + "Draw" if needed)


        // Remove the correct one to generate wrongs

        const uniqueWrongAnswers = Array.from(possibleAnswers.filter(p => p != correctAnswer));
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
            difficulty: correctAnswer === t('quiz.draw') ? 'hard' : 'easy', // draws are harder
            category: 'Winners',
        };
    }
}