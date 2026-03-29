// src/i18n/useTranslation.ts
import { useState, useEffect, createContext, useContext } from 'react';

type Language = 'de' | 'en' | 'es' | 'fr' | 'pl' | 'pt-BR';

import en from './i18n/en.json';
import ptBR from './i18n/pt-BR.json';
import es from './i18n/es.json';
import pl from './i18n/pl.json';
import fr from './i18n/fr.json';
import deDE from './i18n/de.json'; 

const translations: Record<Language, any> = {
  'de': deDE,
  en: en,
  'pt-BR': ptBR,
  es: es,
  pl: pl,
  fr: fr,
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

export function TranslationProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang') as Language | null;
    return saved && ['de', 'en', 'pt-BR', 'es', 'pl', 'fr'].includes(saved) 
      ? saved 
      : 'en';
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
      if (value === undefined || value === null) return key; // fallback
    }

    if (typeof value !== 'string') return key;

    // Simple interpolation
    return String(value).replace(/{([^}]+)}/g, (_, p) => params[p] ?? `{${p}}`);
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