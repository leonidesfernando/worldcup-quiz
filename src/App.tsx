// src/App.tsx
import { useState } from 'react';
import ReactCountryFlag from "react-country-flag"
import QuizScreen from './components/QuizScreen';
import { useTranslation } from './useTranslation';

type Screen = 'home' | 'quiz' | 'results';

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
          <label htmlFor="language-select" className="lang-label">
            {t('home.selectLanguage')}
          </label>
          <select
            id="language-select"
            value={lang}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'es' | 'pt-BR' | 'pl')}
            className="lang-dropdown"
          >
            <option value="en"><ReactCountryFlag countryCode="US" /> English</option>
            <option value="es"><ReactCountryFlag countryCode="ES" /> Español</option>
            <option value="pl"><ReactCountryFlag countryCode="PL" /> Polski</option>
            <option value="pt-BR"><ReactCountryFlag countryCode="BR" /> Português (BR)</option>
          </select>
        </div>
      )}

      <header>
        <h1>{t('app.title')}</h1>
        <p>{t('app.subtitle')}</p>
      </header>

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