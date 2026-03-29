import { isStage, randomSort } from "../filters/filters";
import type { Match } from "../types/worldcup";
import { Utils } from "../utils/Utils";


export class MatchesService {

  private readonly matches: Match[];

  constructor(data: {matches: Match[]}) {
    this.matches = data.matches;

  }

  getMatches() {
    return this.matches;
  }

  getFinals() {
    return this.matches.filter(m => isStage(m, 'final'));
  }

  getSemiFinals() {
    return this.matches.filter(m => isStage(m, 'semi-finals') ||  isStage(m, 'semi-final'));
  }

  /*getFinalByTournamentId(tournamentId:string): Match {
    return this.getFinals().filter(f => f.tournament_id === tournamentId)[0]
  }*/

  getRandomMatch(): Match {
    return Utils.getRandomItem(this.getMatches());
  }

  getOtherCountryCodes(countryCode: string){
      const uniqueWrongHosts = Array.from(
        new Set(
          this.getMatches()
          .filter(m => m.away_team_code !== countryCode)
          .map(m => m.away_team_code)
          .sort(randomSort)
        )
      );
    return uniqueWrongHosts;
  }
}