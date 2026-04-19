import type { Translator } from "../i18n/i18n";
import { createTournamentService } from "../service/factory/TournamentServiceFactory";
import type { QuizQuestion } from "../types/QuizQuestion";
import { Utils } from "../utils/Utils";


const tournamentService = createTournamentService();

export const BallNameQuestion = {
    generateBallNameQuestion(t: Translator): QuizQuestion {
        const tournament = tournamentService.getRandomTournament();
        const year = tournament.year;
        const correctBallName = tournament.ball_name;

        const wrongBallNames = Utils.shuffleArray(tournament.incorrect_ball_names).slice(0, 3);

        const options = Utils.shuffleArray([correctBallName, ...wrongBallNames]);

    return {
      question: t('questions.ballName', { year }),
      options,
      correctAnswerIndex: options.indexOf(correctBallName),
      difficulty: t('quiz.difficultyHard'),
      difficultyClass: 'hard',
      category: t('quiz.categoryHosts'),
    };
    }
}