import { randomSort } from "../filters/filters";
import type { Translator } from "../i18n/i18n";
import { createMatchesService } from "../service/factory/MatchesServiceFactory";
import { createRefereeAppearanceService } from "../service/factory/RefereeAppearanceFactory";
import type { QuizQuestion } from "../types/QuizQuestion";
import { LangUtils } from "../utils/LangUtils";
import { Utils } from "../utils/Utils";


const refereeAppearanceService = createRefereeAppearanceService();
const matchesService = createMatchesService();
export const RefereeAppearanceQuestion = {

    generateRefereeAppearanceQuestion(t:Translator): QuizQuestion {
        const finals = (new Date().getMilliseconds() % 2) === 0;
        let referee;
        let stageName;
        let countries = undefined;

        if(finals === true){
            referee = Utils.getRandomItem(refereeAppearanceService.getFinalReferees());
            stageName = t('questions.final');
            countries = '';
        }else{
            referee = Utils.getRandomItem(refereeAppearanceService.getSemiFinalReferees());
            stageName = t('questions.semiFinal');
        }

        const refereeName = Utils.getFullName(referee.given_name, referee.family_name);
        const year = Utils.getYearByTournamentId(referee.tournament_id);

        const match = matchesService.getByMatchId(referee.match_id);
        countries ??= `${LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, match.home_team_code))} vs ${LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, match.away_team_code))} `;

        const wrongOptions = new Set<string>(Array.from(
            refereeAppearanceService.getByTournamentId(referee.tournament_id)
                    .filter(r => r.match_id !== referee.match_id)
                    .filter(r => r.given_name !== referee.given_name && r.family_name !== referee.family_name)
                    .map(r => Utils.getFullName(r.given_name, r.family_name))
                    .sort(randomSort)
        ));

        const options = Utils.shuffleArray([refereeName, ...Array.from(wrongOptions).slice(0,3)]);

        return {
            question: t('questions.refereeName', { stageName, countries, year }),
            options,
            correctAnswerIndex: options.indexOf(refereeName),
            difficulty: t('quiz.difficultyHard'),
            difficultyClass: 'hard',
            category: t('quiz.categoryMatchesPlayed')
        };
    }
}