import { isMensTournament, randomSort } from "../filters/filters";
import { squadsData } from "../data/squads";

export const SquadData = {
    squads: squadsData.squads
        .filter(s => isMensTournament(s.tournament_name))
        .sort(randomSort)
};