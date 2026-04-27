import { refereeAppearanceData } from "../data/refereeAppearances";
import { isMensTournament, randomSort } from "../filters/filters";

export const RefereeAppearanceData = {
    refereeApperances: refereeAppearanceData.refereesAppearnces
                .filter(r => isMensTournament(r.tournament_name))
                .sort(randomSort)

};