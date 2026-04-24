import { managerAppearanceData } from "../data/managerAppearance";
import { isMensTournament, randomSort } from "../filters/filters";

export const ManagerAppearenceData = {
    managersAppearance: managerAppearanceData.managersAppearance
                .filter(m => isMensTournament(m.tournament_name))
                .sort(randomSort)
};
