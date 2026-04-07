
import { playerAppearancesData } from '../data/playerAppearances';
import { isMensTournament, randomSort } from '../filters/filters';


export const PlayerAppearancesData = {
     playerApparences: playerAppearancesData.playerAppearances
            .filter(h => isMensTournament(h.tournament_name))
            .sort(randomSort)
}