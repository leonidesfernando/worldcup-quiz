import { createSquadService } from "../service/factory/SquadServiceFactory";
import type { QuizQuestion } from '../types/QuizQuestion';
import { Utils } from '../utils/Utils';
import type { Squad } from '../types/squad';
import { LangUtils } from '../utils/LangUtils';
import type { Translator } from "../i18n/i18n";

const squadService = createSquadService();

interface CountryPlayer {
       playerName: string;
        countryName: string;
};

export const CountryPlayersQuestion = {

     generateCountryPlayersQuestion(t:Translator): QuizQuestion {

        const squad1 = squadService.getRandomSquad();
        const player1:CountryPlayer = getPlayerAndCountryBySquad(t, squad1);
        const squad2 = squadService.getRandomSquad();
        const player2:CountryPlayer = getPlayerAndCountryBySquad(t, squad2);
        const squad3 = squadService.getRandomSquad();
        const player3:CountryPlayer = getPlayerAndCountryBySquad(t, squad3);

        const correct = `${player1.countryName}, ${player2.countryName}, ${player3.countryName}`;
        const items = [player1, player2, player3];
        const n = items.length;

        const wrongAnswers = [];
        for(let i = 0; i < 5; i++){
            const cp1 = getWrongPlayerAndCountry(t, squad1);
            const cp2 = getWrongPlayerAndCountry(t, squad1);
            const cp3 = getWrongPlayerAndCountry(t, squad1);
            wrongAnswers.push(
                `${cp1.countryName}, ${cp2.countryName}, ${cp3.countryName}`,
                `${items[i%n].countryName}, ${cp2.countryName}, ${cp3.countryName}`
            );
        }

        const only3 = Utils.shuffleArray(wrongAnswers).slice(0, 3);
        const options = Utils.shuffleArray([correct, ...only3]);

        return {
            question: t('questions.countryPlayers', 
                {player1:player1.playerName, player2:player2.playerName, player3:player3.playerName }),
            options,
            correctAnswerIndex: options.indexOf(correct),
            difficulty: t('quiz.difficultyEasy'),
            difficultyClass: 'easy',
            category: t('quiz.categoryPlayers'),
        };
    }
}

function getWrongPlayerAndCountry(t:Translator, squad: Squad): CountryPlayer {
    const wrongSquad = squadService.getRamdomSquadByWithoutTeamAndPlayer(squad.team_code, squad.given_name, squad.family_name);
    return getPlayerAndCountryBySquad(t, wrongSquad);
}

function getPlayerAndCountryBySquad(t:Translator, squad: Squad): CountryPlayer {
    const year = Utils.getYearByTournamentId(squad.tournament_id);
    const countryName = getCountryTeamName(t, year, squad.team_code);
    const playerName =  Utils.getFullName(squad.given_name, squad.family_name);

    return {
        playerName: playerName,
        countryName: countryName,
    }
}

function getCountryTeamName(t: Translator, year: string, teamCode: string): string {
    return LangUtils.getCountyName(year, 
        LangUtils.getCountryNameByi18n(t, teamCode));
}