import type { Team } from "../types/teams";
import { Utils } from "../utils/Utils";


export class TeamService {
    private readonly teams: Team[];

    constructor(data: {teams:Team[]}){
        this.teams = data.teams;
    }

    getRamdomTeam(): Team {
        return Utils.getRandomItem(this.teams);
    }
}