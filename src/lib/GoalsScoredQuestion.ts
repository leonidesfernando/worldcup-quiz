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
        console.log('goal: ', goal);
        console.log('match date: ', goal.match_date);

        const totalGoalsPlayer = goalService.getGoalsByPlayerNameAndYear(goal.given_name, goal.family_name, goal.tournament_id);

        const year = Utils.getYearByTournamentId(goal.tournament_id);
        const countryName = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, goal.team_code));
        const playerName = GoalUtils.getScorerName(goal);
        console.log('player name: ', playerName);


        const optionsNumber = Utils.shuffleArray([totalGoalsPlayer, ...GoalUtils.generateWrongGoalNumbers(totalGoalsPlayer).slice(0, 3)]);
        const options = optionsNumber.map(n => n.toString());

        console.log('generateTotalGoalScoredByPlayerInAppearance - gerou');
        
        //Quantos gols o jogador DFFF marcou na  Copa do Mundo de {year}?
        return {
            question: t('questions.totalGoalsScoredByPlayerWorldCup', { playerName, countryName, year }),
            options,
            correctAnswerIndex: options.indexOf(totalGoalsPlayer.toString()),
            difficulty: t('quiz.difficultyHard'),//'hard',
            difficultyClass: 'hard',
            category: t('quiz.categoryGoals')//'Matches Played',
        };
    },

    generateTotalGoalsScoredByPlayer(t: Translator): QuizQuestion {

        const goal = goalService.getRandomGoal();
        console.log('generateTotalGoalsScoredByPlayer::goal: ', goal);
        console.log('generateTotalGoalsScoredByPlayer::match date: ', goal.match_date);
        const totalGoalsPlayer = goalService.getTotalGoalsByPlayerName(goal.given_name, goal.family_name);

        const playerName = GoalUtils.getScorerName(goal);
        console.log('generateTotalGoalsScoredByPlayer::player name: ', playerName);
        const year = Utils.getYearByTournamentId(goal.tournament_id);
        const countryName = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, goal.team_code));
        /*const maxWrongNumbers = 3;
        const wrongNumbers = new Set<number>();
        let max = totalGoalsPlayer + (totalGoalsPlayer * 0.2) + 1;
        if(max < maxWrongNumbers){
            max = maxWrongNumbers + 1;
        }
        wrongNumbers.add(Utils.randomNumber(totalGoalsPlayer, 0, max));

        while (wrongNumbers.size < maxWrongNumbers) {
            wrongNumbers.add(Utils.randomNumber(totalGoalsPlayer, 1, max));
            wrongNumbers.add(Utils.randomNumber(totalGoalsPlayer, 0, totalGoalsPlayer+1))
        }

        const optionsNumber = Utils.shuffleArray([totalGoalsPlayer, ...Array.from(wrongNumbers).slice(0, 3)]);*/
        const optionsNumber = Utils.shuffleArray([totalGoalsPlayer, ...GoalUtils.generateWrongGoalNumbers(totalGoalsPlayer).slice(0, 3)]);
        const options = optionsNumber.map(n => n.toString());

        console.log('generateTotalGoalsScoredByPlayer - gerou ');
        //Quantos gols o jogador DFFF marcou em todas suas participações em Copas do Mundo?
        return {
            question: t('questions.totalGoalsScoredByPlayer', { playerName, countryName }),
            options,
            correctAnswerIndex: options.indexOf(totalGoalsPlayer.toString()),
            difficulty: t('quiz.difficultyHard'),//'hard',
            difficultyClass: 'hard',
            category: t('quiz.categoryGoals')//'Matches Played',
        };
    }
};