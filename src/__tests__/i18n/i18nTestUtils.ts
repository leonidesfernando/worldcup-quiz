import { QUESTION_TRANSLATIONS, COUNTRY_TRANSLATIONS } from './translations';
import type { Locale } from './locales';

export const createT = (locale: Locale) => {
  return (key: string, params?: Record<string, any>) => {
    if (key === 'questions.host') {
      return QUESTION_TRANSLATIONS[locale].replace(
        '{{year}}',
        params?.year
      );
    }
    return key;
  };
};

export const getCountryName = (locale: Locale, code: string) => {
  return COUNTRY_TRANSLATIONS[locale][code];
};

export const getAllCountries = (locale: Locale) => {
  return Object.values(COUNTRY_TRANSLATIONS[locale]);
};