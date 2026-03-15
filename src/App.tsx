// src/App.tsx
import { useState } from 'react';
import ReactCountryFlag from "react-country-flag"
import Select from 'react-select';
import QuizScreen from './components/QuizScreen';
import { useTranslation } from './useTranslation';
import Header from './components/Header';

type Screen = 'home' | 'quiz' | 'results';

const languageOptions = [
  { value: 'en', label: 'English', flag: 'US' },
  { value: 'es', label: 'Español', flag: 'ES' },
  { value: 'pl', label: 'Polski', flag: 'PL' },
  { value: 'pt-BR', label: 'Português (BR)', flag: 'BR' },
];

const customStyles = {
  control: (base: any) => ({
    ...base,
    borderRadius: '0.5rem',
    borderColor: '#d1d5db',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '0.3rem',
    minWidth: '160px',
  }),
  option: (base: any) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }),
};

interface RoundResult {
  correct: number;
  wrong: number;
  total: number;
}

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);

  const { t, lang, setLanguage } = useTranslation();

  const startNewRound = () => {
    setRoundResult(null);
    setScreen('quiz');
  };

  const handleRoundFinish = (correct: number, total: number) => {
    setRoundResult({
      correct,
      wrong: total - correct,
      total,
    });
    setScreen('results');
  };

  return (
    <div id="root">
      {/* Language switcher - only visible on home screen */}
      {screen === 'home' && (
        <div className="lang-dropdown-container">

        <Select
          options={languageOptions}
          value={languageOptions.find(opt => opt.value === lang)}
          onChange={(selected) => setLanguage(selected!.value as any)}
          formatOptionLabel={(option) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ReactCountryFlag countryCode={option.flag} svg />
              {option.label}
            </div>
          )}
          styles={customStyles}
          isSearchable={false}
          className=""
          classNamePrefix="lang"/>
                </div>
              )}

      <Header/>

      <main>
        {screen === 'home' && (
          <div className="card">
            <h2 className="home-title">{t('home.ready')}</h2>
            <p className="home-desc" dangerouslySetInnerHTML={{ __html: t('home.description') }} />
            <button onClick={startNewRound} className="start-btn">
              {t('home.startButton')}
            </button>
          </div>
        )}

        {screen === 'quiz' && (
          <QuizScreen totalQuestions={10} onFinish={handleRoundFinish} />
        )}

        {screen === 'results' && roundResult && (
          <div className="card">
            <h2 className="home-title">{t('results.title')}</h2>

            <div className="results-stats">
              <p><strong>{t('results.correct')}:</strong> {roundResult.correct}</p>
              <p><strong>{t('results.wrong')}:</strong> {roundResult.wrong}</p>
              <p><strong>{t('results.points')}:</strong> {roundResult.correct} / {roundResult.total}</p>
            </div>

            <button onClick={startNewRound} className="start-btn">
              {t('results.playAgain')}
            </button>

            <button 
              onClick={() => setScreen('home')}
              className="back-to-home-btn"
            >
              {t('results.backToHome')}
            </button>
          </div>
        )}
      </main>

      <footer>
        {t('app.builtBy')}
      </footer>
    </div>
  );
}

export default App;