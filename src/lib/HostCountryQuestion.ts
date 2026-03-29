import {Utils} from '../utils/Utils'
import type { QuizQuestion } from '../types/QuizQuestion';
import { createMatchesService } from '../service/fatory/MatchesServiceFactory';
import { LangUtils } from '../utils/LangUtils';
import { createHostsService } from '../service/fatory/HostsServiceFactory';

const matchService = createMatchesService();
const hostService = createHostsService();
export const HostCountryQuestion = {

 generateHostCountryQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {
  
  const host = hostService.getRandomHost();
  const year = Utils.getYearByTournamentId(host.tournament_id);
  
  //TODO: criar metodo para buscar todos os hosts dado o tournament_id, uma string e separando os nomes por virgula

  const uniqueWrongHosts = matchService.getOtherCountryCodes(host.team_code);

  const wrongHosts = Utils.shuffleArray(uniqueWrongHosts).slice(0, 3);
  const wrongHostsNames:string[] = [];
  const correctHost = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, host.team_code));
  wrongHosts.forEach(w => wrongHostsNames.push(LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, w))));

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