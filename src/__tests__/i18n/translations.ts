import type { Locale } from './locales';

export const QUESTION_TRANSLATIONS: Record<Locale, string> = {
  en: 'Which country hosted the World Cup in {{year}}?',
  pl: 'Który kraj był gospodarzem MŚ w {{year}}?',
  es: '¿Qué país fue anfitrión del Mundial en {{year}}?',
  pt: 'Qual país sediou a Copa do Mundo em {{year}}?',
  fr: 'question": "Quel pays a accueilli la Coupe du monde en {{year}} ?',
  de: 'Welches Land hat die Weltmeisterschaft im Jahr {{year}} ausgerichtet?'
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
  fr: {
    "RUS": "Russie",
    "BRA": "Brésil",
    "GER": "Allemagne",
    "FRA": "France",
    "ARG": "Argentine"
  },
  de: {
    "RUS": "Russland",
    "BRA": "Brasilien",
    "GER": "Deutschland",
    "FRA": "Frankreich",
    "ARG": "Argentinien"
  }
};