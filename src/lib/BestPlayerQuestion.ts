import type { Translator } from "../i18n/i18n";
import { WorldCupService } from "../service/worldCupService";
import type { QuizQuestion } from "../types/QuizQuestion";
import type { AwardWinners, PlayerApparences } from "../types/worldcup";
import { Constants } from "../utils/Constants";
import { Utils } from "../utils/Utils";

const worldCupService = new WorldCupService();

export const BestPlayerQuestion = {
    generateBestPlayerQuestion(t: Translator): QuizQuestion {
        return generateAwardQuestion(t, 1978, 'questions.bestPlayer', 'golden ball');
    },

    generateGoldenGlovePlayerQuestion(t: Translator): QuizQuestion {
        return generateAwardQuestion(t, 1994, 'questions.goldenGlove', 'golden glove', 'GK');
    },

    generateBestYoungPlayerQuestion(t: Translator): QuizQuestion {
        return generateAwardQuestion(t, 1978, 'questions.bestYoungPlayer', 'best young player');
    },

    generateSilverBallPlayerQuestion(t: Translator): QuizQuestion {
        return generateAwardQuestion(t, 1978, 'questions.silverBall', 'silver ball');
    }
}

function getAwardsWinners(award: string): AwardWinners[] {
    return worldCupService.getAwards().filter(
        a => a.award_name?.toLowerCase().includes(award)
    );
}

function generateAwardQuestion(t: Translator, fristYearAwardGranted: number, i18nCodeQuestion: string, award: string, position?: string): QuizQuestion {
    const awardsWinners = getAwardsWinners(award);

    const notAwarded = t('quiz.notAwardedYet'); // "Not awarded yet"

    // Years where Golden Ball was awarded
    const awardedYears = Utils.shuffleArray(Array.from(
        new Set(
            awardsWinners.map(a => a.tournament_name.replace(Constants.WORLD_CUP_REGEX, ''))
        )
    ));

    const year = Utils.getRandomItem(awardedYears);
    let correctAnswer: string;

    let yearSearch = year;
    if (Number(year) >= fristYearAwardGranted) {
        const award = awardsWinners.find(a => a.tournament_name.includes(year))!;
        correctAnswer = Utils.getFullPlayerName(award?.given_name, award.family_name);
    } else {
        correctAnswer = notAwarded;
        yearSearch = fristYearAwardGranted.toString();
    }

    const sameYearsPlayer = worldCupService.getPlayers()
        .filter((p: PlayerApparences) => p.tournament_name.includes(yearSearch))
        .filter((p: PlayerApparences) => Utils.isNotEmptyOrNull(position) ? p.position_code === position : true);
    const otherPlayers = sameYearsPlayer
        .map(a => Utils.getFullPlayerName(a.given_name, a.family_name))
        .filter(p => p != correctAnswer);


    const wrongCandidates = new Set<string>();
    while (wrongCandidates.size < 4) {
        wrongCandidates.add(Utils.getRandomItem(otherPlayers));
    }

    if (correctAnswer !== notAwarded && (new Date().getMilliseconds() % 2) == 0) {
        wrongCandidates.add(notAwarded);
    }

    const uniqueWrong = Utils.shuffleArray(Array.from(wrongCandidates)).slice(0, 3);
    const options = Utils.shuffleArray([correctAnswer, ...uniqueWrong]);
    return {
        question: t(i18nCodeQuestion, { year }),
        options,
        correctAnswerIndex: options.indexOf(correctAnswer),
        difficulty: correctAnswer === notAwarded ? t('quiz.difficultyEasy') : t('quiz.difficultyMedium'),
        difficultyClass: correctAnswer === notAwarded ? 'easy' : 'medium',
        category: t('quiz.categoryAwards')//'Awards',
    };
}