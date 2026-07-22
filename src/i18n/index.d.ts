// src/i18n/index.d.ts  (or wherever you have the declaration)

const supportedLangs = 'de' | 'en' | 'es' | 'fr' | 'pl' | 'pt-BR' | 'hi';

declare module '../i18n/useTranslation' {
  export function useTranslation(): {
    t: (key: string, params?: Record<string, any>) => string;
    lang: supportedLangs
    setLanguage: (lang: supportedLangs) => void;
  };
}