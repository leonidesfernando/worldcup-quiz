// src/components/Results.tsx
import { useTranslation } from "../useTranslation";
import { motion } from "framer-motion";
import ConfettiEffect from "../hooks/useConfetti";
import correctIcon from "../assets/correct.png";
import incorrectIcon from "../assets/incorrect.png";
import worldCupTrophy from "../assets/world-cup-trophy.png";
import silverMedal from "../assets/silver-medal.png";
import bronzeMedal from "../assets/bronze-medal.png";
import SafeHtmlFormatter from "./SafeHtmlFormatter";
import { useEffect, useState } from "react";
import { AdMobService } from "../service/AdMobService";
import shareIcon from "../assets/share.png";
import { useShareScore } from '../hooks/useShareScore';
import {Utils} from '../utils/Utils';
import { HistoryService } from "../service/HistoryService";
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
  const { lang } = useTranslation();
  const percentage = Math.round((result.correct / result.total) * 100);

  // State for bonus and reward offer
  //const [bonusPoints, setBonusPoints] = useState(0);
  const [bonusPoints] = useState(0);
  //const [showRewardOffer, setShowRewardOffer] = useState(false);
  const { shareScore } = useShareScore();

  const finalScore = result.correct + bonusPoints;
  const hasTrophy = percentage >= 70;

  // Trigger confetti rain needed
  //useConfetti(percentage);

  useEffect(() => {
  if (result) {
    HistoryService.saveResult(result.correct, result.total, lang);
  }
}, [result]);
  

// Preload rewarded ad
  useEffect(() => {
    AdMobService.loadRewarded();
  }, []);


// ====================== SMART REWARD TIMING ======================
  /*useEffect(() => {
    let delay = 0;

    if (percentage === 100) {
      delay = 2200;                    // Wait for big celebration
    } else if (percentage >= 80) {
      delay = 1400;                    // Spring animation duration ≈ 1.2–1.5s
    } else if (percentage >= 70) {
      delay = 900;                     // Rotate animation is fast (~0.6s)
    } else {
      delay = 600;                     // Show almost immediately for low scores
    }

    const timer = setTimeout(() => {
      setShowRewardOffer(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [percentage]);*/

  /*const handleWatchAdForBonus = () => {
    AdMobService.showRewarded(() => {
      setBonusPoints(50);
      setShowRewardOffer(false); // hide offer after watching
    });
  };*/


  const handlePlayAgain = async () => {
    await AdMobService.showRewarded(() => {
      // Optional: give bonus even on Play Again
      // setBonusPoints(50);
    });
    onPlayAgain();
  };

const handleBackToHome = async () => {
  await AdMobService.showRewarded(() => {
    // Optional bonus on Back to Home
  });
  onBackToHome();
};

const handleShareScore = async () => {
  const resultsCard = document.querySelector('.results-card') as HTMLElement;
  if (!resultsCard) return;

  await shareScore(resultsCard, finalScore, result.total, percentage, t);
};

  // Trophy / Medal logic
  let trophyImage = null;
  let trophyClass = "";
  let message = "";
  let animationVariant = {};

  //numver of messages for top3
  const indexes = [1,2,3,4];
  let index = Utils.getRandomItem(Utils.shuffleArray(indexes));

  if (percentage === 100) {
    trophyImage = worldCupTrophy;
    trophyClass = "gold";
    message = t(`results.champion${index}`);
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
    message = t(`results.secondPosition${index}`);
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
    message = t(`results.thirdPosition${index}`);
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
    indexes.push(5, 6);
    index = Utils.getRandomItem(Utils.shuffleArray(indexes));
    message = t(`results.keepGoing${index}`);

    animationVariant = {
      initial: { scale: 1, rotate: 0, y: 0 },  // Default safe state
      animate: { scale: 1, rotate: 0, y: 0, transition: { duration: 0 } }
    };
  }

  return (
    <div className="results-screen">
      {/* Confetti Effect - placed outside the card so it covers the whole screen */}
      <ConfettiEffect percentage={percentage} />
      <div className="results-card">
        {/* Trophy Section with Animation */}
        {hasTrophy && (
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
        </motion.div>
        )}
        <h2 className="results-title">{t("results.title")}</h2>

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

        {/* Reward Offer - appears automatically after animation */}
        {/* showRewardOffer && bonusPoints === 0 && (
          <div className="reward-offer">
            <p>Want more points?</p>
            <button onClick={handleWatchAdForBonus} className="reward-btn">
              🎥 Watch short ad → Get +50 Bonus Points
            </button>
          </div>
        ) */}

        {/* Action Buttons */}
        <div className="results-footer">
          <button onClick={handlePlayAgain} className="primary-btn">
            {t("results.playAgain")}
          </button>

          <button onClick={handleBackToHome} className="secondary-btn">
            {t("results.backToHome")}
          </button>

          {/* Share Button */}
          <button onClick={handleShareScore} className="share-btn">
            <img src={shareIcon} />
             {t('results.shareScore')}
          </button>
        </div>
      </div>
    </div>
  );
}
