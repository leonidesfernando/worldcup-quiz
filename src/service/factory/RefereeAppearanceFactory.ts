import { RefereeAppearanceData } from "../../selectors/refereeAppearanceDataSelector";
import type { RefereeAppearances } from "../../types/refereeAppearances";
import { RefereeAppearanceService } from "../RefereeAppearanceService";

interface RefereeAppearanceDataInput {
    refereeAppearances: RefereeAppearances[];
}

export function createRefereeAppearanceService(
    data: RefereeAppearanceDataInput = {
        refereeAppearances: RefereeAppearanceData.refereeApperances
}): RefereeAppearanceService {
    return new RefereeAppearanceService(data);
}
