import { randomSort } from './../filters/filters';
import { teamsData } from "../data/teams";

export const TeamsData = {
    teams: teamsData.teams
            .filter(t => t.mens_team === 1)
            .sort(randomSort)
};