import {
  mockGetRandomHost,
  mockGetOtherCountryCodes,
  mockGetYear,
  mockGetCountryName,
  mockGetCountryNameByI18n,
} from '../setup/hostQuestion.mocks';

import { createHostFixture } from '../fixtures/hostQuestion.fixture';
import { createT, getCountryName } from '../i18n/i18nTestUtils';
import type { Locale } from '../i18n/locales';

export const setupHostQuestion = (options?: {
  locale?: Locale;
  hostCode?: string;
  wrongCodes?: string[];
}) => {
  const locale = options?.locale ?? 'en';

  const host = createHostFixture({
    team_code: options?.hostCode ?? 'RUS',
  });

  const wrongCodes = options?.wrongCodes ?? ['BRA', 'GER', 'FRA', 'ARG'];

  mockGetRandomHost.mockReturnValue(host);
  mockGetOtherCountryCodes.mockReturnValue(wrongCodes);
  mockGetYear.mockReturnValue('2018');

  mockGetCountryNameByI18n.mockImplementation((_, code: string) => `countries.${code}`);

  mockGetCountryName.mockImplementation((_, key: string) => {
    const code = key.replace('countries.', '');
    return getCountryName(locale, code);
  });

  return {
    t: createT(locale),
    locale,
    host,
    wrongCodes,
  };
};