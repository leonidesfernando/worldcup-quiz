// dataSelectors.ts
import { worldCupData } from '../data/worldcup';
import { isMensTournament } from '../filters/filters';


export const mensData = {
  tournaments: worldCupData.tournaments.filter(t =>
    isMensTournament(t.tournament_name)
    
  ),
  matches: worldCupData.matches.filter(m =>
    isMensTournament(m.tournament_name)
    //const mensMatches = worldCupData.matches.filter(m => !m.tournament_name.includes(WOMEN));
  ),
  awards: worldCupData.awardWinners.filter(a =>
    isMensTournament(a.tournament_name) &&
    isMensTournament(a.award_name)
    //const mensAwards = worldCupData.awardWinners.filter(a => !a.award_name.includes(WOMEN) && !a.tournament_name.includes(WOMEN)) || [];
  ),
  goals: worldCupData.goals.filter(g =>
    isMensTournament(g.tournament_name)
    //const mensGoals = worldCupData.goals.filter((g: Goal) => !g.tournament_name.includes(WOMEN)) // ← Add men's filter here too
  ),
  players: worldCupData.playerApparences.filter(p =>
    isMensTournament(p.tournament_name)
    //const mensPlayers = worldCupData.playerApparences.filter((p: PlayerApparences) => !p.tournament_name.includes(WOMEN));
  )
};

/*
const mensTournaments = worldCupData.tournaments.filter(t => !t.tournament_name.includes(WOMEN));
const mensMatches = worldCupData.matches.filter(m => !m.tournament_name.includes(WOMEN));
const mensAwards = worldCupData.awardWinners.filter(a => !a.award_name.includes(WOMEN) && !a.tournament_name.includes(WOMEN)) || [];
const mensGoals = worldCupData.goals.filter((g: Goal) => !g.tournament_name.includes(WOMEN)) // ← Add men's filter here too
const mensPlayers = worldCupData.playerApparences.filter((p: PlayerApparences) => !p.tournament_name.includes(WOMEN));
*/