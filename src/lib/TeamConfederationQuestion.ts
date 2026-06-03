import type { Translator } from "../i18n/i18n";
import { createTeamService } from "../service/factory/TeamServiceFactory";
import type { QuizQuestion } from "../types/QuizQuestion";
import { Constants } from "../utils/Constants";
import { LangUtils } from "../utils/LangUtils";
import { Utils } from "../utils/Utils";


const teamService = createTeamService();
const confederations = Constants.confederations;
export const TeamConfederationQuestion = {

    generateTeamConfederationQuestion(t:Translator): QuizQuestion {

        const team = teamService.getRamdomTeam();
        const teamName = LangUtils.getCountryNameByi18n(t, team.team_code);

        const wrongs = Utils.getNRandomItemsExcludingThese(confederations, 3, [team.confederation_code]);

        const options = Utils.shuffleArray([team.confederation_code, ...wrongs]);
        
        return {
            question: t('questions.teamFederation', {teamName}),
            options,
            correctAnswerIndex: options.indexOf(team.confederation_code),
            difficulty: t('quiz.difficultyEasy'),
            difficultyClass: 'easy',
            category: t('quiz.categoryFederation')
        }
    }
};