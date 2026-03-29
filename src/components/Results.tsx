// src/components/Results.tsx
import { useTranslation } from '../useTranslation';
import correctIcon from '../assets/correct.png';
import incorrectIcon from '../assets/incorrect.png';
import worldCupTrophy from '../assets/world-cup-trophy.png';
import silverMedal from '../assets/silver-medal.png';
import bronzeMedal from '../assets/bronze-medal.png';

interface RoundResult {
  correct: number;
  wrong: number;
  total: number;
}

interface Props {
  result: RoundResult;
  onPlayAgain: () => void;
  onBackToHome: () => void;
}

export default function Results({ result, onPlayAgain, onBackToHome }: Readonly<Props>) {
  const { t } = useTranslation();
  const percentage = Math.round((result.correct / result.total) * 100);

  // Trophy / Medal logic
  let trophyImage = null;
  let trophyClass = '';
  let message = '';

  if (percentage === 100) {
    trophyImage = worldCupTrophy;
    trophyClass = 'gold';
    message = t("results.champion");
  } else if (percentage >= 80) {
    trophyImage = silverMedal;
    trophyClass = 'silver';
    message = t("results.secondPosition");
  } else if (percentage >= 70) {
    trophyImage = bronzeMedal;
    trophyClass = 'bronze';
    message = t("results.thirdPosition");
  } else {
    trophyImage = null;
    trophyClass = 'no-trophy';
    message = t("results.keepGoing");
  }

  return (
    <div className="results-screen">
      <div className="results-card">
        {/* Trophy / Medal Section */}
        <div className={`trophy-section ${trophyClass}`}>
          {trophyImage && (
            <img 
              src={trophyImage} 
              alt="Achievement" 
              className="achievement-trophy" 
            />
          )}
          <h3 className="results-title">{t("results.title")}</h3>
        </div>

        {/* Motivational Message */}
        <p className="results-message">{message}</p>

        {/* Big Score Circle */}
        <div className="results-score-circle">
          <div className="score-inner">
            <span className="score-number">{result.correct}</span>
            <span className="score-total">/{result.total}</span>
          </div>
          <div className="score-percentage">{percentage}%</div>
        </div>

        {/* Stats */}
        <div className="results-stats">
          <div className="stat-item correct">
            <img src={correctIcon} alt="Correct" className="stat-icon" />
            <div className="stat-info">
              <div className="stat-value">{result.correct}</div>
              <div className="stat-label">{t("results.correct")}</div>
            </div>
          </div>

          <div className="stat-item wrong">
            <img src={incorrectIcon} alt="Wrong" className="stat-icon" />
            <div className="stat-info">
              <div className="stat-value">{result.wrong}</div>
              <div className="stat-label">{t("results.wrong")}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="results-footer">
          <button onClick={onPlayAgain} className="primary-btn">
            {t("results.playAgain")}
          </button>

          <button onClick={onBackToHome} className="secondary-btn">
            {t("results.backToHome")}
          </button>
        </div>
      </div>
    </div>
  );
}