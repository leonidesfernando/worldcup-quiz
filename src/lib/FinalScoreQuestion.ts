    import { createMatchesService } from "../service/factory/MatchesServiceFactory";
    import type { QuizQuestion } from "../types/QuizQuestion";
    import { LangUtils } from "../utils/LangUtils";
    import { Utils } from "../utils/Utils";


    const matchesService = createMatchesService();

    export const FinalScoreQuestion = {
        generateFinalScoreQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {
            const finals = matchesService.getFinals();

            const selectedFinals = Utils.shuffleArray(finals).slice(0, 3);
            const correctMatch = selectedFinals[0];
            const year = Utils.getYearByTournamentId(correctMatch.tournament_id);

            const correctHomeTeamName = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, correctMatch.home_team_code));
            const correctAwayTeamName = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, correctMatch.away_team_code));
            const correctAnswer = `${correctHomeTeamName} ${correctMatch.home_team_score} - ${correctMatch.away_team_score} ${correctAwayTeamName}`;

            const options = Utils.shuffleArray(selectedFinals
                    .filter(m => m.match_id != correctMatch.match_id)
                    .map(m => {
                            const homeTeamName = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, m.home_team_code));
                            const awayTeamName = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, m.away_team_code));
                            return `${homeTeamName} ${m.home_team_score} - ${m.away_team_score} ${awayTeamName}`;
                    }
            )).slice(0, 2);

            // get incorrect score for home and away team
            let incorrectHomeTeamScore = Number(correctMatch.home_team_score);
            let incorrectAwayteamScore = Number(correctMatch.away_team_score);
            let initialIncorrectHomeScore = 0;
            let initialIncorrectAwayScore = 0;
            let incorrectAnswer = correctAnswer;

            while (incorrectAnswer === correctAnswer) {
                if(incorrectHomeTeamScore === 0){
                    incorrectHomeTeamScore = 5;
                    initialIncorrectHomeScore = 1;
                }else{
                    incorrectHomeTeamScore--;
                }

                if(incorrectAwayteamScore === 0){
                    incorrectAwayteamScore = 4;
                    initialIncorrectAwayScore = 1;
                }else{
                    incorrectAwayteamScore--;
                }
                incorrectAnswer = `${correctHomeTeamName} ${Utils.getRandomNumberInRange(initialIncorrectHomeScore, incorrectHomeTeamScore)} - ${Utils.getRandomNumberInRange(initialIncorrectAwayScore, incorrectAwayteamScore)} ${correctAwayTeamName}`;
            }
            options.push(correctAnswer, incorrectAnswer);

            // Shuffle so correct can be anywhere
            const shuffledOptions = Utils.shuffleArray(options);
            const correctIndex = shuffledOptions.indexOf(correctAnswer);
            return {
                question: t('questions.finalScore', { year }),
                options: shuffledOptions,
                correctAnswerIndex: correctIndex,
                difficulty: t('quiz.difficultyMedium'),//'medium',
                difficultyClass: 'medium',
                category: t('quiz.categoryFinals')//'Finals',
            };
        }
    }