// dataSelectors.ts
import { worldCupData } from '../data/worldcup';
import { isMensTournament } from '../filters/filters';


export const mensData = {
  tournaments: worldCupData.tournaments.filter(t =>
    isMensTournament(t.tournament_name)
    
  ),
  matches: worldCupData.matches.filter(m =>
    isMensTournament(m.tournament_name)
  ),
  awards: worldCupData.awardWinners.filter(a =>
    isMensTournament(a.tournament_name) &&
    isMensTournament(a.award_name)
  ),
  goals: worldCupData.goals.filter(g =>
    isMensTournament(g.tournament_name)
  ),
  players: worldCupData.playerApparences.filter(p =>
    isMensTournament(p.tournament_name)
  )
};
