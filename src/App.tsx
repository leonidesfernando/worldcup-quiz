// src/App.tsx
import { useState } from "react";
import QuizScreen from "./components/QuizScreen";
import { useTranslation } from "./useTranslation";
import Header from "./components/Header";
import Results from "./components/Results";
import Settings from "./components/Settings";
import History from "./components/History";
import SafeHtmlFormatter from "./components/SafeHtmlFormatter";
import { useShareScore } from './hooks/useShareScore';

type Screen = "home" | "quiz" | "results" | "settings" | "history";

interface RoundResult {
  correct: number;
  wrong: number;
  total: number;
}

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);

  const { t } = useTranslation();
  const { shareScore } = useShareScore();
  const [isSharing, setIsSharing] = useState(false);

  // Share handler - stable and safe
  const handleShareScore = async () => {
    if (!roundResult || isSharing) {
      console.warn("No round result available");
      return;
    }
    setIsSharing(true);

    // Small delay ensures the DOM has the results card
    setTimeout(async () => {
      const resultsCard = document.querySelector('.results-card') as HTMLElement;
      if (!resultsCard) {
        console.warn("Results card not found in DOM");
        return;
      }

      const percentage = Math.round((roundResult.correct / roundResult.total) * 100);
      const finalScore = roundResult.correct;

      try {
        await shareScore(resultsCard, finalScore, roundResult.total, percentage, t);
      } catch (error) {
        console.error("Share failed:", error);
      } finally {
        setIsSharing(false);
      }
    }, 150);
  };

  const startNewRound = () => {
    setRoundResult(null);
    setScreen("quiz");
  };

  const handleRoundFinish = (correct: number, total: number) => {
    setRoundResult({
      correct,
      wrong: total - correct,
      total,
    });
    setScreen("results");
  };

  const goBackHome = () => setScreen("home");
  //const openSettings = () => setScreen("settings");
  const closeSettings = () => setScreen("home");
  const openHistory = () => setScreen("history");

  return (
    <div id="root">
<Header 
  onSettingsClick={screen === "settings" ? undefined : () => setScreen("settings")}
  onShareClick={screen === 'results' ? handleShareScore : undefined}
  isSharing={isSharing}
  currentScreen={screen}           // ← Important: pass current screen
/>

      <main>
        {screen === "home" && (
          <div className="home-wrapper">
            <div className="card">
              <h2 className="home-title">{t("home.ready")}</h2>
              <SafeHtmlFormatter html={t("home.description")} className="home-desc" />
              <button onClick={startNewRound} className="start-btn">
                {t("home.startButton")}
              </button>
            </div>
            <footer>{t("app.builtBy")}</footer>
          </div>
        )}

        {screen === "quiz" && (
          <QuizScreen 
            totalQuestions={10} 
            onFinish={handleRoundFinish} 
            onBack={goBackHome}
            onOpenHistory={openHistory}           // ← Fixed
          />
        )}

        {screen === "results" && roundResult && (
          <Results
            result={roundResult}
            onPlayAgain={startNewRound}
            onBackToHome={goBackHome}
            onOpenHistory={openHistory}           // ← Fixed
          />
        )}

        {screen === "settings" && (
          <Settings onClose={closeSettings} onOpenHistory={openHistory} />
        )}

        {screen === "history" && <History onClose={goBackHome} />}
      </main>
    </div>
  );
}

export default App;