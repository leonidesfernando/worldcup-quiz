import { SquadData } from "../../selectors/squadsDataSelectos";
import type { Squad } from "../../types/squad";
import { SquadService } from "../SquadService";


interface SquadDataInput { 
    squads: Squad[];
}

export function createSquadService(
    data: SquadDataInput = {
        squads: SquadData.squads
    }
): SquadService { 
    return new SquadService(data);
}