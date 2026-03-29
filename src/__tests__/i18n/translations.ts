import type { Locale } from './locales';

export const QUESTION_TRANSLATIONS: Record<Locale, string> = {
  en: 'Which country hosted the World Cup in {{year}}?',
  pl: 'Który kraj był gospodarzem MŚ w {{year}}?',
  es: '¿Qué país fue anfitrión del Mundial en {{year}}?',
  pt: 'Qual país sediou a Copa do Mundo em {{year}}?',
};

export const COUNTRY_TRANSLATIONS: Record<Locale, Record<string, string>> = {
  en: {
    RUS: 'Russia',
    BRA: 'Brazil',
    GER: 'Germany',
    FRA: 'France',
    ARG: 'Argentina',
  },
  pl: {
    RUS: 'Rosja',
    BRA: 'Brazylia',
    GER: 'Niemcy',
    FRA: 'Francja',
    ARG: 'Argentyna',
  },
  es: {
    RUS: 'Rusia',
    BRA: 'Brasil',
    GER: 'Alemania',
    FRA: 'Francia',
    ARG: 'Argentina',
  },
  pt: {
    RUS: 'Rússia',
    BRA: 'Brasil',
    GER: 'Alemanha',
    FRA: 'França',
    ARG: 'Argentina',
  },
};