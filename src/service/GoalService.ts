import { isMensTournament } from "../filters/filters";
import type { Goal } from "../types/worldcup";
import { Utils } from "../utils/Utils";


export class GoalService {
    private readonly goals: Goal[];

    constructor(data: { goals: Goal[] }) {
        this.goals = data.goals;
    }

    getTotalGoalsByPlayerName(givenName: string, familyName: string): number {
        return this.goals
            .filter(g => g.given_name === givenName && g.family_name === familyName)
            .length;
    }


    getGoalsByPlayerNameAndYear(givenName: string, familyName: string, tournamentId: string): number {
        return this.goals
            .filter(g => g.given_name === givenName && g.family_name === familyName)
            .filter(g => g.tournament_id === tournamentId).length;
    }

    getRandomGoal(): Goal {
        return Utils.getRandomItem(this.goals.filter(g => isMensTournament(g.tournament_name)));
    }
}