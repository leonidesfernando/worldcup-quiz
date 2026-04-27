import { PlayerAppearancesData } from "../../selectors/playerAppearanceDataSelector";
import type { PlayerAppearance } from "../../types/playerAppearance";
import { PlayerAppearanceService } from "../PlayerAppearanceService";

interface PlayerAppearanceDataInput{
    playerAppearances: PlayerAppearance[];
}

export function createPlayerAppearanceService(
    data: PlayerAppearanceDataInput = {
        playerAppearances: PlayerAppearancesData.playerApparences
    }
): PlayerAppearanceService{
    return new PlayerAppearanceService(data);
}