import type { Translator } from "../i18n/i18n";
import { createGoalService } from "../service/factory/GoalServiceFactory";
import type { QuizQuestion } from "../types/QuizQuestion";
import { GoalUtils } from "../utils/GoalUtils";
import { LangUtils } from "../utils/LangUtils";
import { Utils } from "../utils/Utils";


const goalService = createGoalService();


export const GoalsScoredQuestion = {

    generateTotalGoalScoredByPlayerInAppearance(t: Translator): QuizQuestion {
        const goal = goalService.getRandomGoal();
        const totalGoalsPlayer = goalService.getGoalsByPlayerNameAndYear(goal.given_name, goal.family_name, goal.tournament_id);
        const year = Utils.getYearByTournamentId(goal.tournament_id);
        const countryName = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, goal.player_team_code));
        const playerName = GoalUtils.getScorerName(goal);
        const optionsNumber = Utils.shuffleArray([totalGoalsPlayer, ...GoalUtils.generateWrongGoalNumbers(totalGoalsPlayer).slice(0, 3)]);
        const options = optionsNumber.map(n => n.toString());

        
        //Quantos gols o jogador DFFF marcou na  Copa do Mundo de {year}?
        return {
            question: t('questions.totalGoalsScoredByPlayerWorldCup', { playerName, countryName, year }),
            options,
            correctAnswerIndex: options.indexOf(totalGoalsPlayer.toString()),
            difficulty: t('quiz.difficultyHard'),
            difficultyClass: 'hard',
            category: t('quiz.categoryGoals')
        };
    },

    generateTotalGoalsScoredByPlayer(t: Translator): QuizQuestion {

        const goal = goalService.getRandomGoal();
        const totalGoalsPlayer = goalService.getTotalGoalsByPlayerName(goal.given_name, goal.family_name);

        const playerName = GoalUtils.getScorerName(goal);
        const year = Utils.getYearByTournamentId(goal.tournament_id);
        const countryName = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, goal.player_team_code));
        const optionsNumber = Utils.shuffleArray([totalGoalsPlayer, ...GoalUtils.generateWrongGoalNumbers(totalGoalsPlayer).slice(0, 3)]);
        const options = optionsNumber.map(n => n.toString());

        //Quantos gols o jogador DFFF marcou em todas suas participações em Copas do Mundo?
        return {
            question: t('questions.totalGoalsScoredByPlayer', { playerName, countryName }),
            options,
            correctAnswerIndex: options.indexOf(totalGoalsPlayer.toString()),
            difficulty: t('quiz.difficultyHard'),
            difficultyClass: 'hard',
            category: t('quiz.categoryGoals')
        };
    }
};