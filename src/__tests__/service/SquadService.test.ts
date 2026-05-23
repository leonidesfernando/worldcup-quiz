import { describe, expect, it } from "vitest";
import { createSquadService } from "../../service/factory/SquadServiceFactory";


describe('SquadService', () => {
    const service = createSquadService();
    it('Chekcs 1994 squad', () => {
        const empty = service.getSquadsByTournament("1994 FIFA Men's World Cup");
        expect(empty).toHaveLength(528)
    })

    it('Should not see Woman', () => {

        const squads = service.getSquads()
                        .filter(s => s.tournament_name.includes("Women"));
        expect(squads).toHaveLength(0);
        
    })
})