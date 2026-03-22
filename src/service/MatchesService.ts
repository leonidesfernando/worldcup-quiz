import { randomSort } from "../filters/filters";
//import { matchesData } from "../selectors/matchDataSelector";
import type { Match } from "../types/worldcup";
import { Utils } from "../utils/Utils";


export class MatchesService {

  private readonly matches: Match[];
  private readonly finals: Match[];
  private readonly semiFinals: Match[];
  constructor(data: {matches: Match[], finals: Match[], semiFinals: Match[]}) {
    this.matches = data.matches;
    this.finals = data.finals;
    this.semiFinals = data.semiFinals;
  }

  getMatches() {
    return this.matches;
  }

  getFinals() {
    return this.finals
  }

  getSemiFinals() {
    return this.semiFinals
  }

  getFinalByTournamentId(tournamentId:string): Match {
    return this.getFinals().filter(f => f.tournament_id === tournamentId)[0]
  }

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