import { isStage, randomSort } from "../filters/filters";
import { createMatchesService } from "../service/factory/MatchesServiceFactory";
import type { QuizQuestion } from "../types/QuizQuestion";
import { LangUtils } from "../utils/LangUtils";
import { MatchUtils } from "../utils/MatchUtils";
import { Utils } from "../utils/Utils";


const matchService = createMatchesService();

export const RunnerUpQuestion = {

    generateRunnerUpQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {

        const finalMatch = Utils.getRandomItem(matchService.getFinals().filter(m => isStage(m, 'final')));
        const year = Utils.getYearByTournamentId(finalMatch.tournament_id);
        const countryWinnerCode = MatchUtils.getWinnerCountryCode(finalMatch);
        const runnerUpCode = MatchUtils.getLoserMatchByCountyCode(finalMatch);

        const winnerCountryCode = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, countryWinnerCode));
        const runnerUpCountryCode = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, runnerUpCode));
        const correctAnswer: string = LangUtils.getCountyName(year + '', runnerUpCountryCode);
        const inCorrectAnswer: string = LangUtils.getCountyName(year + '', winnerCountryCode);

        let games = matchService.getFinals();
        games.push(...matchService.getSemiFinals());
        games = Utils.shuffleArray(games)

        const possibleAnswers = [...new Set(games
            .map(g => LangUtils.getCountyName(year + '', LangUtils.getCountryNameByi18n(t, MatchUtils.getWinnerCountryCode(g))))
        )].sort(randomSort);


        // Remove the correct one to generate wrongs

        const uniqueWrongAnswers = Array.from(possibleAnswers.filter(p => p != correctAnswer).filter(p => p != inCorrectAnswer));

        // Pick 3 different wrong answers
        const wrongAnswers = Utils.shuffleArray(uniqueWrongAnswers).slice(0, 2);

        // All options
        const options = Utils.shuffleArray([correctAnswer, inCorrectAnswer, ...wrongAnswers]);
        return {
            question: t('questions.runnerUp', { year }),
            options,
            correctAnswerIndex: options.indexOf(correctAnswer),
            difficulty: t('quiz.difficultyMedium'),
            difficultyClass: 'hard',
            category: t('quiz.categoryRunnerUp')
        };
    }
}