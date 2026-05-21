import type { Squad } from "../types/squad";
import { Utils } from "../utils/Utils";

export class SquadService {
    private readonly squads: Squad[];

    constructor(data: {squads: Squad[]}) {
        this.squads = data.squads;
    }

    getSquads(): Squad[] {
        return this.squads;
    }

    getSquadsByTournament(tournamentName: string): Squad[] {
        return this.squads
            .filter(s => s.tournament_name == tournamentName);
    }

    getRandomSquad(): Squad {
        return Utils.getRandomItem(this.squads);
    }

    getRandomSquadByTournamet(tournamentName: string): Squad {
        return Utils.getRandomItem(this.getSquadsByTournament(tournamentName));
    }

    /**
     * Return a random Squad, excluding the team and player(givenName, familyName)
     * @param teamCode 
     * @param givenName 
     * @param familyName 
     */
    getRamdomSquadByWithoutTeamAndPlayer(teamCode: string, givenName: string, familyName: string): Squad {
        const squads = this.squads.filter(s => s.team_code !== teamCode)
            .filter(g => !(g.given_name === givenName && g.family_name === familyName));
        return Utils.getRandomItem(squads);
    }
}