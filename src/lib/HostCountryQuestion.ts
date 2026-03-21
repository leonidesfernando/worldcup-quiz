import {Utils} from '../utils/Utils'
import type { QuizQuestion } from '../types/QuizQuestion';
import { MatchesService } from '../service/MatchesService';
import { HostService } from '../service/HostService';

const matchService = new MatchesService();
const hostService = new HostService();
export const HostCountryQuestion = {

 generateHostCountryQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {
  
  const host = hostService.getRandomHost();
  const year = Utils.getYearByTournamentId(host.tournament_id);

  const uniqueWrongHosts = matchService.getOtherCountryCodes(host.team_code);

  if(uniqueWrongHosts.length < 3){
    return HostCountryQuestion.generateHostCountryQuestion(t);
  }

  const wrongHosts = Utils.shuffleArray(uniqueWrongHosts).slice(0, 3);
  const wrongHostsNames:string[] = [];
  const correctHost = t(`countries.${host.team_code}`);
  wrongHosts.forEach(w => wrongHostsNames.push(t(`countries.${w}`)));

  const options = Utils.shuffleArray([correctHost,... wrongHostsNames]);

  return {
    question: t('questions.host', { year }),
    options,
    correctAnswerIndex: options.indexOf(correctHost),
    difficulty: 'easy',
    category: 'Hosts',
  };
}

}