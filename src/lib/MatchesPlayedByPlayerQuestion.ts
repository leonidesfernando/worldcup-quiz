import { createPlayerAppearanceService } from "../service/factory/PlayerAppearanceServiceFactory";
import type { QuizQuestion } from "../types/QuizQuestion";
import { GoalUtils } from "../utils/GoalUtils";
import { LangUtils } from "../utils/LangUtils";
import { PlayerAppearanceUtils } from "../utils/PlayerAppearanceUtil";
import { Utils } from "../utils/Utils";


const playerAppearanceService = createPlayerAppearanceService();
export const MatchesPlayedByPlayerQuestion = {

    generateMatchesPlayedByPlayerQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {

        const correctPlayerAppearance = playerAppearanceService.getRandomPlayerAppearance();
        const playerName = PlayerAppearanceUtils.getPlayerName(correctPlayerAppearance);
        
        let correctAppearances = playerAppearanceService.getAllPlayerAppearances(correctPlayerAppearance);
        
        const appearancesInCountriesPos2ndWar = PlayerAppearanceUtils.getPlayAppearancesWithPosSecondWarCountryName(correctPlayerAppearance, correctAppearances);
        if(appearancesInCountriesPos2ndWar.length > 0){
            correctAppearances = appearancesInCountriesPos2ndWar;
        }
        
        const year = Utils.getYearByTournamentId(correctPlayerAppearance.tournament_id);

        const correctNumber = correctAppearances.length;
        let countryName;
        if(appearancesInCountriesPos2ndWar.length > 0){
            countryName = LangUtils.getCountryNameByi18n(t, correctPlayerAppearance.team_code);
        }else {
            countryName = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, correctPlayerAppearance.team_code));
        }

        /*const wrongNumbers = new Set<number>();
        const max = correctNumber + (correctNumber * 0.2);
        wrongNumbers.add(Utils.randomNumber(correctNumber, 1, max));

        while (wrongNumbers.size < 3) {
            wrongNumbers.add(Utils.randomNumber(correctNumber, 1, max));
            wrongNumbers.add(Utils.randomNumber(correctNumber, 1, correctNumber+1))
        }

        const optionsNumber = Utils.shuffleArray([correctNumber, ...Array.from(wrongNumbers).slice(0, 3)]);*/
        const optionsNumber = Utils.shuffleArray([correctNumber, ...GoalUtils.generateWrongGoalNumbers(correctNumber).slice(0, 3)]);
        const options = optionsNumber.map(n => n.toString());
        

        return {
            question: t('questions.totalPlayerMatches', { playerName, countryName }),
            options,
            correctAnswerIndex: options.indexOf(correctNumber.toString()),
            difficulty: t('quiz.difficultyHard'),//'hard',
            difficultyClass: 'hard',
            category: t('quiz.categoryMatchesPlayed')//'Matches Played',
        };
    }
}