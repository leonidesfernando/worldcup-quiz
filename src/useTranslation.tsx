// src/i18n/useTranslation.ts
import { useState, useEffect, createContext, useContext } from 'react';

type Language = 'en' | 'pt-BR' | 'es' | 'pl';

interface Translations {
  [key: string]: any;
}

const translations: Record<Language, Translations> = {
  en: (await import('./i18n/en.json')).default,
  'pt-BR': (await import('./i18n/pt-BR.json')).default,
  es: (await import('./i18n/es.json')).default,
  pl: (await import('./i18n/pl.json')).default,
};

const TranslationContext = createContext<{
  t: (key: string, params?: Record<string, any>) => string;
  lang: Language;
  setLanguage: (lang: Language) => void;
}>({
  t: (key) => key,
  lang: 'en',
  setLanguage: () => {},
});

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang') as Language;
    return saved && ['en', 'pt-BR', 'es', 'pl'].includes(saved) ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string, params: Record<string, any> = {}) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
      if (!value) return key; // fallback to key
    }

    if (typeof value !== 'string') return key;

    // Simple interpolation: {count} → params.count
    return (String(value)).replace(/{([^}]+)}/g, (_, p) => params[p] ?? `{${p}}`);
  };

  return (
    <TranslationContext.Provider value={{ t, lang, setLanguage: setLang }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
