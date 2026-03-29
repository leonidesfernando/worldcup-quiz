// src/i18n/index.d.ts  (or wherever you have the declaration)
declare module '../i18n/useTranslation' {
  export function useTranslation(): {
    t: (key: string, params?: Record<string, any>) => string;
    lang: 'de' | 'en' | 'es' | 'fr' | 'pl' | 'pt-BR';
    setLanguage: (lang: 'de' | 'en' | 'es' | 'fr' | 'pl' | 'pt-BR') => void;
  };
}