// src/App.tsx
import { useState } from "react";
import QuizScreen from "./components/QuizScreen";
import { useTranslation } from "./useTranslation";
import Header from "./components/Header";
import LanguageSelector from "./components/LanguageSelector";

type Screen = "home" | "quiz" | "results";

interface RoundResult {
  correct: number;
  wrong: number;
  total: number;
}

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);

  const { t } = useTranslation();

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

  return (
    <div id="root">
      <Header />

      <main>
        {screen === "home" && (
          <div className="home-wrapper">
            <div className="lang-dropdown-container">
              <LanguageSelector />
            </div>

            <div className="card">
              <h2 className="home-title">{t("home.ready")}</h2>
              <p
                className="home-desc"
                dangerouslySetInnerHTML={{ __html: t("home.description") }}
              />
              <button onClick={startNewRound} className="start-btn">
                {t("home.startButton")}
              </button>
            </div>
          </div>
        )}

        {screen === "quiz" && (
          <QuizScreen totalQuestions={1} onFinish={handleRoundFinish} />
        )}

        {screen === "results" && roundResult && (
          <div className="card">
            <h2 className="home-title">{t("results.title")}</h2>

            <div className="results-stats">
              <p>
                <strong>{t("results.correct")}:</strong> {roundResult.correct}
              </p>
              <p>
                <strong>{t("results.wrong")}:</strong> {roundResult.wrong}
              </p>
              <p>
                <strong>{t("results.points")}:</strong> {roundResult.correct} /{" "}
                {roundResult.total}
              </p>
            </div>

            <button onClick={startNewRound} className="start-btn">
              {t("results.playAgain")}
            </button>

            <button
              onClick={() => setScreen("home")}
              className="back-to-home-btn"
            >
              {t("results.backToHome")}
            </button>
          </div>
        )}
      </main>

      <footer>{t("app.builtBy")}</footer>
    </div>
  );
}

export default App;
