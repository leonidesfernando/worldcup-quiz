import { describe, expect, it } from "vitest";
import { SquadData } from "../../selectors/squadsDataSelectos"

describe('SquadData integrity', () => {
    it('Should not see Woman or Women', () => {
        const squads = SquadData.squads;

        const squadsTournamentName = 
        squads.filter(s => s.tournament_name.includes("Women"));

        
        expect(squadsTournamentName).toHaveLength(0);
        
    });
    

})