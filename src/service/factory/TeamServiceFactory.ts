import { TeamsData } from "../../selectors/teamsDataSelector";
import type { Team } from "../../types/teams";
import { TeamService } from "../TeamService";

interface TeamDataInput {
    teams: Team[];
}

export function createTeamService(data: TeamDataInput = {teams: TeamsData.teams}): TeamService{
    return new TeamService(data);
}