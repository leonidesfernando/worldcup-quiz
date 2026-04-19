// worldCupService.ts

import { mensData } from "../selectors/dataSelectors";
import { Utils } from "../utils/Utils";
import { randomSort } from '../filters/filters';
import type { Goal } from "../types/worldcup";

export class WorldCupService {
  getRandomTournament() {
    return Utils.getRandomItem(mensData.tournaments);
  }

  getTournamentById(tournamentId: string){
    return mensData.tournaments.filter(t => t.tournament_id === tournamentId)[0];
  }

  
  /*getMatches() {
    return mensData.matches;
  }

  getFinals() {
    return mensData.matches
                .filter(m => m.stage_name?.toLowerCase() === 'final')
                .sort(randomSort)
                //.sort(() => Math.random() - 0.5);
  }*/

  getGoals(): Goal[]{
    return Utils.shuffleArray(mensData.goals);
  }

  getTournaments(){
    return mensData.tournaments;
  }

  getAwards(){
    return mensData.awards;
  }

  getPlayers(){
    return mensData.players;
  }

  /**
   * Return a Set of Hosts without the informed one, in a random order
   * @param host 
   * @returns 
   */
  getOtherHosts(host: string){
      const uniqueWrongHosts = Array.from(
        new Set(
          this.getTournaments()
          .filter(t => t.host_country !== host)
          .map(t => t.host_country)
          .sort(randomSort)
          //.sort(() => Math.random() - 0.5)
        )
      );
    return uniqueWrongHosts;
  }
}