import { createPlayerAppearanceService } from "../service/factory/PlayerAppearanceServiceFactory";
import type { QuizQuestion } from "../types/QuizQuestion";
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

        const wrongNumbers = new Set<number>();
        wrongNumbers.add(Utils.randomNumber(correctNumber, 1, 30));

        while (wrongNumbers.size < 3) {
            wrongNumbers.add(Utils.randomNumber(correctNumber, 1, 30));
            wrongNumbers.add(Utils.randomNumber(correctNumber, 1, correctNumber+1))
        }

        const optionsNumber = Utils.shuffleArray([correctNumber, ...Array.from(wrongNumbers)]);
        const options = optionsNumber.map(n => n.toString());
        

        return {
            question: t('questions.totalPlayerMatches', { playerName, countryName }),
            options,
            correctAnswerIndex: options.indexOf(correctNumber.toString()),
            difficulty: 'hard',
            category: 'Player Appearence',
        };
    }
}