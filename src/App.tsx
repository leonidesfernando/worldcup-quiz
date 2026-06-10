// src/App.tsx
import { useState } from "react";
import QuizScreen from "./components/QuizScreen";
import { useTranslation } from "./useTranslation";
import Header from "./components/Header";
import Results from "./components/Results";
import Settings from "./components/Settings";
import History from "./components/History";
import SafeHtmlFormatter from "./components/SafeHtmlFormatter";
import { useShareScore } from "./hooks/useShareScore";
import { useCacheBuster } from "./hooks/useCacheBuster";
import { Constants } from "./utils/Constants";
import { useShareApp } from "./hooks/useShareApp";
import shareIcon from "./assets/share.png";

type Screen = "home" | "quiz" | "results" | "settings" | "history";

interface RoundResult {
  correct: number;
  wrong: number;
  total: number;
}

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);

  const { t, lang } = useTranslation();
  const { shareScore } = useShareScore();
  const [isSharing, setIsSharing] = useState(false);
  const { shareApp } = useShareApp()

  useCacheBuster();

  // Share handler - stable and safe
  const handleShareScore = async () => {
    if (!roundResult || isSharing) {
      console.warn("No round result available");
      return;
    }
    setIsSharing(true);

    // Small delay to let React render any visual changes
    await new Promise((resolve) => setTimeout(resolve, 80));

    // Small delay ensures the DOM has the results card
    setTimeout(async () => {
      const resultsCard = document.querySelector(
        ".results-card",
      ) as HTMLElement;
      if (!resultsCard) {
        console.warn("Results card not found in DOM");
        return;
      }

      const percentage = Math.round(
        (roundResult.correct / roundResult.total) * 100,
      );
      const finalScore = roundResult.correct;

      try {
        await shareScore(
          resultsCard,
          finalScore,
          roundResult.total,
          percentage,
          t,
        );
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
        onSettingsClick={
          screen === "settings" ? undefined : () => setScreen("settings")
        }
        onShareClick={screen === "results" ? handleShareScore : undefined}
        isSharing={isSharing}
        currentScreen={screen} // ← Important: pass current screen
      />

      <main>
        {screen === "home" && (
          <div className="home-wrapper">
            <div className="card">
              <h2 className="home-title">{t("home.ready")}</h2>
              <SafeHtmlFormatter
                html={t("home.description")}
                className="home-desc"
              />
              <button onClick={startNewRound} className="start-btn">
                {t("home.startButton")}
              </button>

              {/* Secondary Share Button */}
              <button
                onClick={() => shareApp(t)}
                className="share-app-home-screen-btn"
              >
                
                <img src={shareIcon} className="share-icon" alt="Share" />
                {t("settings.shareWithFriends")}
              </button>
            </div>
            <footer>{t("app.builtBy")}</footer>
          </div>
        )}

        {screen === "quiz" && (
          <QuizScreen
            totalQuestions={Constants.NUMBER_OF_QUESTIONS_PER_ROUND}
            onFinish={handleRoundFinish}
            onBack={goBackHome}
            onOpenHistory={openHistory}
            currentLang={lang}
          />
        )}

        {screen === "results" && roundResult && (
          <Results
            result={roundResult}
            onPlayAgain={startNewRound}
            onBackToHome={goBackHome}
            onOpenHistory={openHistory} // ← Fixed
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
