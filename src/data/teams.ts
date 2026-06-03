import data from './db/teams.json' with {type: 'json'};
import type { Team } from "../types/teams";


export const teamsData = {
    teams: data.teams as Team[]
} as const;