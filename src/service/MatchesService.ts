import { randomSort } from "../filters/filters";
import { matchesData } from "../selectors/matchDataSelector";
import type { Match } from "../types/worldcup";
import { Utils } from "../utils/Utils";


export class MatchesService {


  getMatches() {
    return matchesData.matches;
  }

  getFinals() {
    return matchesData.finals
  }

  getSemiFinals() {
    return matchesData.semiFinals
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