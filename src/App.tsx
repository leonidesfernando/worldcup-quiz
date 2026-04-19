// src/App.tsx
//import { useState, useEffect } from "react";
import { useState } from "react";
import QuizScreen from "./components/QuizScreen";
import { useTranslation } from "./useTranslation";
import Header from "./components/Header";
import Results from "./components/Results";
import Settings from "./components/Settings";
//import { AdMobService } from "./service/AdMobService";

type Screen = "home" | "quiz" | "results" | "settings";

interface RoundResult {
  correct: number;
  wrong: number;
  total: number;
}



function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);

  const { t } = useTranslation();

// show banner on the bottom all the time, for all pages
  /*  useEffect(() => {
    AdMobService.showBanner();
    return () => {
      AdMobService.hideBanner();
    };
  }, []);*/

/*  
useEffect(() => {
  // Show banner only when on Home screen
  if (screen === "home") {
    AdMobService.showBanner();
  } else {
    AdMobService.hideBanner();
  }

  // Cleanup: hide banner when App component unmounts
  return () => {
    AdMobService.hideBanner();
  };
}, [screen]);   // Re-run whenever screen changes
*/


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
  const openSettings = () => setScreen("settings");
  const closeSettings = () => setScreen("home");

  return (
    <div id="root">
      <Header onSettingsClick={openSettings} />

      <main>
        {screen === "home" && (
          <div className="home-wrapper">


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
          <QuizScreen totalQuestions={10} onFinish={handleRoundFinish} onBack={goBackHome} />
        )}

        {screen === "results" && roundResult && (
          <Results
            result={roundResult}
            onPlayAgain={startNewRound}
            onBackToHome={() => setScreen("home")}
          />
        )}
        {screen === "settings" && <Settings onClose={closeSettings} />}
      </main>

      <footer>{t("app.builtBy")}</footer>
    </div>
  );
}

export default App;
