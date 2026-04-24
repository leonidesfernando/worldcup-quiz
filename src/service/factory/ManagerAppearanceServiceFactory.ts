//import { managerAppearanceData } from "../../data/managerAppearance";
import { ManagerAppearenceData } from "../../selectors/managerAppearanceDataSelector";
import type { ManagerAppearance } from "../../types/managerAppearance";
import { ManagerAppearanceService } from "../ManagerAppearanceService";

interface ManagerAppearanceDataInput {
    managersAppearance: ManagerAppearance[]
}

export function createManagerAppearanceService(data: ManagerAppearanceDataInput = {
    managersAppearance: ManagerAppearenceData.managersAppearance
}): ManagerAppearanceService {
    return new ManagerAppearanceService(data);
}