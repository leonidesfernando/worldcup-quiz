import { matchData } from '../data/matches';
import { isMensTournament, isStage } from '../filters/filters';
import { Utils } from '../utils/Utils';


const mensMatches = matchData.matches.filter(m =>
  isMensTournament(m.tournament_name)
);

export const matchesData = {
  matches: Utils.shuffleArray(mensMatches),

  finals: Utils.shuffleArray(
    mensMatches.filter(m => isStage(m, 'final'))
  ),

  semiFinals: Utils.shuffleArray(
    mensMatches.filter(m => isStage(m, 'semi-finals'))
               .filter(m => isStage(m, 'semi-final'))
  ),
};