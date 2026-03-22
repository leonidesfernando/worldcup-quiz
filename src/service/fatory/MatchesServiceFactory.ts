// src/service/matchesServiceFactory.ts
import { matchesData } from '../../selectors/matchDataSelector';
import type { Match } from '../../types/worldcup';
import { MatchesService } from '../MatchesService';

interface MatchesDataInput {
  matches: Match[];
  finals: Match[];
  semiFinals: Match[];
}

export function createMatchesService(
  // Optional override for testing / different environments
  data: MatchesDataInput = {
    matches: matchesData.matches,
    finals: matchesData.finals,
    semiFinals: matchesData.semiFinals,
  }
): MatchesService {
  return new MatchesService(data);
}