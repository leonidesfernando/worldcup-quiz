// src/i18n/useTranslation.tsx
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
  'en': en,
  'es': es,
  'fr': fr,
  'pl': pl,
  'pt-BR': ptBR,
};

// Function to detect best language from device
const detectDeviceLanguage = (): Language => {
  const deviceLang = navigator.language || (navigator as any).userLanguage || 'en';
  
  const langMap: Record<string, Language> = {
    'pt': 'pt-BR',
    'pt-BR': 'pt-BR',
    'es': 'es',
    'fr': 'fr',
    'de': 'de',
    'pl': 'pl',
    'en': 'en',
    'en-US': 'en',
    'en-GB': 'en',
  };

  // Try exact match first
  if (langMap[deviceLang]) return langMap[deviceLang];

  // Try base language (e.g., 'pt' from 'pt-BR')
  const baseLang = deviceLang.split('-')[0];
  if (langMap[baseLang]) return langMap[baseLang];

  // Default fallback
  return 'en';
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
    const savedLang = localStorage.getItem('lang') as Language | null;
    
    // Use saved language if exists, otherwise detect from device
    if (savedLang && ['de','en','es','fr','pl','pt-BR'].includes(savedLang)) {
      return savedLang;
    }
    
    return detectDeviceLanguage();
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'pt-BR' ? 'pt' : lang;
  }, [lang]);

  const t = (key: string, params: Record<string, any> = {}) => {
    const keys = key.split('.');
    let value = translations[lang];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined || value === null) {
        return key; // fallback to key
      }
    }

    if (typeof value !== 'string') return key;

    return String(value).replace(/{([^}]+)}/g, (_, p) => params[p] ?? `{${p}}`);
  };

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
  };

  return (
    <TranslationContext.Provider value={{ t, lang, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}