import { MatchesService } from "../service/MatchesService";
import type { QuizQuestion } from "../types/QuizQuestion";
import { LangUtils } from "../utils/LangUtils";
import { Utils } from "../utils/Utils";
import { WinnerQuestion } from "./WinnerQuestion";


const matchesService = new MatchesService();

export const FinalScoreQuestion = {
    generateFinalScoreQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {
        const finals = matchesService.getFinals();
        if (finals.length < 4) return WinnerQuestion.generateWinnerQuestion(t); // safety

        // Pick 4 different finals
        const selectedFinals = Utils.shuffleArray(finals).slice(0, 3);
        const correctMatch = selectedFinals[0];
        const year = Utils.getYearByTournamentId(correctMatch.tournament_id);

        const correctHomeTeamName = LangUtils.getCountyName(year, t(`countries.${correctMatch.home_team_code}`));
        const correctAwayTeamName = LangUtils.getCountyName(year, t(`countries.${correctMatch.away_team_code}`));
        const correctAnswer = `${correctHomeTeamName} ${correctMatch.home_team_score} - ${correctMatch.away_team_score} ${correctAwayTeamName}`;

        const options = selectedFinals.map(m => {
            const homeTeamName = LangUtils.getCountyName(year, t(`countries.${m.home_team_code}`));
            const awayTeamName = LangUtils.getCountyName(year, t(`countries.${m.away_team_code}`));
            return `${homeTeamName} ${m.home_team_score} - ${m.away_team_score} ${awayTeamName}`;
        }
        );

        options.push(`${correctHomeTeamName} ${Utils.getRandomNumberInRange(0, Number(correctMatch.home_team_score - 1))} - ${Utils.getRandomNumberInRange(0, Number(correctMatch.away_team_score - 1))} ${correctAwayTeamName}`)

        // Shuffle so correct can be anywhere
        const shuffledOptions = Utils.shuffleArray(options);
        const correctIndex = shuffledOptions.indexOf(correctAnswer);
        return {
            question: t('questions.finalScore', { year }),
            options: shuffledOptions,
            correctAnswerIndex: correctIndex,
            difficulty: 'medium',
            category: 'Finals',
        };
    }
}