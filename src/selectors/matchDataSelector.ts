import { matchData } from '../data/matches';
import { isMensTournament, isStage, randomSort } from '../filters/filters';


export const matchesData = {
     matches: matchData.matches
            .filter(m => isMensTournament(m.tournament_name))
            .sort(randomSort),

      finals: matchData.matches
            .filter(m => isMensTournament(m.tournament_name))
            .filter(m => isStage(m, 'final'))
            .sort(randomSort),

     semiFinals: matchData.matches
            .filter(m => isMensTournament(m.tournament_name))
            .filter(m => isStage(m, 'semi-finals'))
            .sort(randomSort),

}