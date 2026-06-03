import { describe, expect, it } from "vitest";
import { TeamsData } from "../../selectors/teamsDataSelector";

describe('TeamsData integrity', () => {
    it('Only mens teams', () => {
      
        const teams = TeamsData.teams;

        const womenTeams = teams.filter(t => t.mens_team === 0);

        expect(womenTeams).toHaveLength(0);
    })
})