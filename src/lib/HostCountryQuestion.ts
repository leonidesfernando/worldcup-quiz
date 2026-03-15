import {Utils} from '../utils/Utils'
import type { QuizQuestion } from '../types/QuizQuestion';
import { WorldCupService } from '../service/worldCupService';

const worldCupService = new WorldCupService();

export const HostCountryQuestion = {

 generateHostCountryQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {
  const tournament = worldCupService.getRandomTournament();
  const year = tournament.year;
  const host = tournament.host_country;
  const uniqueWrongHosts = worldCupService.getOtherHosts(host);

  if(uniqueWrongHosts.length < 3){
    return HostCountryQuestion.generateHostCountryQuestion(t);
  }

  const wrongHosts = Utils.shuffleArray(uniqueWrongHosts).slice(0, 3);
  const options = Utils.shuffleArray([host, ...wrongHosts]);

  return {
    question: t('questions.host', { year }),
    options,
    correctAnswerIndex: options.indexOf(host),
    explanation: t('questions.explanationHost', {host, year}),
    difficulty: 'easy',
    category: 'Hosts',
  };
}

}