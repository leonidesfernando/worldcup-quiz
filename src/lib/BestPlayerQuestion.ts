import { WorldCupService } from "../service/worldCupService";
import type { QuizQuestion } from "../types/QuizQuestion";
import type { PlayerApparences } from "../types/worldcup";
import { Constants } from "../utils/Constants";
import { Utils } from "../utils/Utils";

const worldCupService = new WorldCupService();

export const BestPlayerQuestion = {
    generateBestPlayerQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {

    // Filter for Golden Ball / Best Player awards
    const goldenBallAwards = worldCupService.getAwards().filter(
        a => a.award_name?.toLowerCase().includes('golden ball') || 
            a.award_name?.toLowerCase().includes('best player')
    );

    const notAwarded = t('quiz.notAwardedYet'); // "Not awarded yet"

    // Years where Golden Ball was awarded
    const awardedYears = Array.from(
        new Set(
        goldenBallAwards.map(a => a.tournament_name.replace(Constants.WORLD_CUP_REGEX, ''))
        )
    );

    let year: string;
    let correctAnswer: string;
    let explanationParams: Record<string, any> = {};

    year = Utils.getRandomItem(awardedYears);
    if(Number(year) >= 1982){
    const award = goldenBallAwards.find(a => a.tournament_name.includes(year))!;
    correctAnswer = Utils.getFullPlayerName(award?.given_name, award.family_name);
    explanationParams = { player: correctAnswer, year };
    } else {
        // Random year (including pre-1982)
        const allYears = worldCupService.getTournaments().map(t => String(t.year));
        year = Utils.getRandomItem(allYears);
        correctAnswer = notAwarded;
        explanationParams = { year };
    }

    const sameYearsPlayer = worldCupService.getPlayers().filter((p:PlayerApparences) => p.tournament_name.includes(year));
    const otherPlayers = sameYearsPlayer
                            .map(a => Utils.getFullPlayerName(a.given_name, a.family_name))
                            .filter(p => p != correctAnswer);

        
    let wrongCandidates = [Utils.getRandomItem(otherPlayers), Utils.getRandomItem(otherPlayers)];
    if((Math.random() % 2) == 0){
        wrongCandidates.push(Utils.getRandomItem(otherPlayers));
    }else {
        wrongCandidates.push(notAwarded);
    }
    
    // For pre-1982 (correct = notAwarded), don't repeat it as wrong
    if (correctAnswer === notAwarded) {
        wrongCandidates = wrongCandidates.filter(c => c !== notAwarded);
    }
    
    const uniqueWrong = Array.from(new Set(wrongCandidates)).slice(0, 3);
    const options = Utils.shuffleArray([correctAnswer, ...Utils.addWrongOptions(uniqueWrong,t)]);

    return {
        question: t('questions.bestPlayer', { year }),
        options,
        correctAnswerIndex: options.indexOf(correctAnswer),
        explanation: t(
        correctAnswer === notAwarded
            ? 'questions.explanationNotAwarded'
            : 'questions.explanationBestPlayer',
        explanationParams
        ),
        difficulty: correctAnswer === notAwarded ? 'easy' : 'medium',
        category: 'Awards',
    };
    }
}