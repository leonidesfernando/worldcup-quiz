declare module '../i18n/useTranslation' {
  export function useTranslation(): {
    t: (key: string, params?: Record<string, any>) => string;
    lang: 'en' | 'pt-BR' | 'es' | 'pl';
    setLanguage: (lang: 'en' | 'pt-BR' | 'es' | 'pl') => void;
  };
}