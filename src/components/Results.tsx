// src/components/Results.tsx
import { useTranslation } from "../useTranslation";
import { motion } from "framer-motion";
import { useConfetti } from "../hooks/useConfetti";
import correctIcon from "../assets/correct.png";
import incorrectIcon from "../assets/incorrect.png";
import worldCupTrophy from "../assets/world-cup-trophy.png";
import silverMedal from "../assets/silver-medal.png";
import bronzeMedal from "../assets/bronze-medal.png";
import SafeHtmlFormatter from "./SafeHtmlFormatter";

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

export default function Results({
  result,
  onPlayAgain,
  onBackToHome,
}: Readonly<Props>) {
  const { t } = useTranslation();
  const percentage = Math.round((result.correct / result.total) * 100);

  // Trigger confetti rain needed
  useConfetti(percentage);

  // Trophy / Medal logic
  let trophyImage = null;
  let trophyClass = "";
  let message = "";
  let animationVariant = {};

  if (percentage === 100) {
    trophyImage = worldCupTrophy;
    trophyClass = "gold";
    message = t("results.champion");
    animationVariant = {
      initial: { scale: 0.6, rotate: -15, y: 50 },
      animate: {
        scale: 1,
        rotate: 0,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 12 },
      },
    };
  } else if (percentage >= 80) {
    trophyImage = silverMedal;
    trophyClass = "silver";
    message = t("results.secondPosition");
    animationVariant = {
      initial: { scale: 0.7, y: 40 },
      animate: {
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 },
      },
    };
  } else if (percentage >= 70) {
    trophyImage = bronzeMedal;
    trophyClass = "bronze";
    message = t("results.thirdPosition");
    animationVariant = {
      initial: { scale: 0.8, rotate: 10 },
      animate: {
        scale: 1,
        rotate: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    };
  } else {
    trophyImage = null;
    trophyClass = "no-trophy";
    message = t("results.keepGoing");
  }

  return (
    <div className="results-screen">
      <div className="results-card">
        {/* Trophy Section with Animation */}
        <motion.div
          className={`trophy-section ${trophyClass}`}
          initial="initial"
          animate="animate"
          variants={animationVariant}
        >
          {trophyImage && (
            <motion.img
              src={trophyImage}
              alt="Achievement"
              className="achievement-trophy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          )}
          <h2 className="results-title">{t("results.title")}</h2>
        </motion.div>

        {/* Motivational Message */}
        <SafeHtmlFormatter html={message} className="results-message" />


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
