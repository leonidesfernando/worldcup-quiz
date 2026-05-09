// src/context/SettingsContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface SettingsContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isTimerEnabled: boolean;
  toggleTimer: () => void;
  showCorrectAnswer: boolean;
  toggleShowCorrectAnswer: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isTimerEnabled, setIsTimerEnabled] = useState(() => {
    // Timer is OFF by default — opt-in feature
    return localStorage.getItem('timerEnabled') === 'true';
  });

  const [showCorrectAnswer, setShowCorrectAnswer] = useState(() => {
    // Show correct answer ON by default — user must opt-in to harder mode
    const saved = localStorage.getItem('showCorrectAnswer');
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  useEffect(() => {
    localStorage.setItem('timerEnabled', String(isTimerEnabled));
  }, [isTimerEnabled]);

  const toggleTimer = () => setIsTimerEnabled(prev => !prev);

  useEffect(() => {
    localStorage.setItem('showCorrectAnswer', String(showCorrectAnswer));
  }, [showCorrectAnswer]);

  const toggleShowCorrectAnswer = () => setShowCorrectAnswer(prev => !prev);

  return (
    <SettingsContext.Provider value={{ isDarkMode, toggleDarkMode, isTimerEnabled, toggleTimer, showCorrectAnswer, toggleShowCorrectAnswer }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};