import { randomSort } from "../filters/filters";
import type { Translator } from "../i18n/i18n";
import { createMatchesService } from "../service/factory/MatchesServiceFactory";
import type { QuizQuestion } from "../types/QuizQuestion";
import { LangUtils } from "../utils/LangUtils";
import { Utils } from "../utils/Utils";


const matchesService = createMatchesService();
export const StadiumNameQuestion = {

    generateStadiumNameQuestion(t:Translator): QuizQuestion {
        
        const finals = (new Date().getMilliseconds() % 2) === 0;
        let match;
        let stageName;
        let countries = undefined;
        if(finals === true){
            match = Utils.getRandomItem(matchesService.getFinals())
            stageName = t('questions.final');
            countries = '';
        }else{
            match = Utils.getRandomItem(matchesService.getSemiFinals());
            stageName = t('questions.semiFinal');
        }


        const stadiumName = match.stadium_name;
        const year = Utils.getYearByTournamentId(match.tournament_id);

        countries ??= `${LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, match.home_team_code))} vs ${LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, match.away_team_code))} `;


        const wrongOptions = new Set<string>(Array.from( matchesService.getByTournamentId(match.tournament_id)
                            .filter(m => m.match_id !== match.match_id)
                            .filter(m => m.stadium_name !== match.stadium_name)
                            .map(m => m.stadium_name)
                            .sort(randomSort)));

        const options = Utils.shuffleArray([stadiumName, ...Array.from(wrongOptions).slice(0,3)]);
        
        return {
            question: t('questions.estadiumName', { stageName, countries, year }),
            options,
            correctAnswerIndex: options.indexOf(stadiumName),
            difficulty: t('quiz.difficultyMedium'),
            difficultyClass: 'medium',
            category: t('quiz.categoryMatchesPlayed')
        };
    }
}