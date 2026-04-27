import { Utils } from '../utils/Utils'
import type { QuizQuestion } from '../types/QuizQuestion';
import { createMatchesService } from '../service/factory/MatchesServiceFactory';
import { LangUtils } from '../utils/LangUtils';
import { createHostsService } from '../service/factory/HostsServiceFactory';

const matchService = createMatchesService();
const hostService = createHostsService();
export const HostCountryQuestion = {

  generateHostCountryQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {

    const host = hostService.getRandomHost();
    const year = Utils.getYearByTournamentId(host.tournament_id);

    const correctHosts: string[] = hostService.getHostsByTournamentId(host.tournament_id);

    const uniqueWrongHosts = new Set<string>();
    correctHosts.forEach(h => {
      matchService.getOtherCountryCodes(h).forEach(ohter => {
        uniqueWrongHosts.add(ohter);
      })
    });


    const wrongHosts = Utils.shuffleArray(Array.from(uniqueWrongHosts)).slice(0, 3);
    const wrongHostsNames: string[] = [];
    const correctHost = correctHosts
      .map(h =>
        LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, h))
      )
      .join(", ");
    wrongHosts.forEach(w => wrongHostsNames.push(LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, w))));

    const options = Utils.shuffleArray([correctHost, ...wrongHostsNames]);

    return {
      question: t('questions.host', { year }),
      options,
      correctAnswerIndex: options.indexOf(correctHost),
      difficulty: t('quiz.difficultyEasy'),
      difficultyClass: 'easy',
      category: t('quiz.categoryHosts')
    };
  }

}