// src/components/TimeUpScreen.tsx
import { motion } from "framer-motion";
import { useTranslation } from "../useTranslation";
import { AdMobService } from "../service/AdMobService";
import timveOverIcon from "../assets/time-over.png";
import { useEffect } from "react";

interface Props {
  correctCount: number;
  totalQuestions: number;
  onFinish: () => void;
  onBack: () => void;
  onOpenHistory: () => void;
}

export default function TimeUpScreen({
  correctCount,
  totalQuestions,
  onFinish,
  onBack,
  onOpenHistory
}: Readonly<Props>) {
  const { t } = useTranslation();

// Preload rewarded ad
  useEffect(() => {
    //AdMobService.loadRewarded();
    AdMobService.loadInterstitial();
  }, []);
  

  const handleBack = async () => {
    //await AdMobService.showRewarded(() => {});
    await AdMobService.showInterstitial();
    onBack();
  };

  return (
    <div className="timeup-overlay">
      {/* Animated clock icon */}
      <motion.img
        src={timveOverIcon}
        className="timeup-icon"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.1 }}
      />
        
      

      {/* Title */}
      <motion.h2
        className="timeup-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        {t("quiz.timeUp")}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="timeup-message"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        {t("quiz.timeUpMessage")}
      </motion.p>

      {/* Score summary */}
      <motion.div
        className="timeup-score"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        <span className="timeup-score__number">{correctCount}</span>
        <span className="timeup-score__separator">/</span>
        <span className="timeup-score__total">{totalQuestions}</span>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="timeup-actions"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <button onClick={onFinish} className="primary-btn">
          {t("quiz.timeUpSeeResults")}
        </button>
        <button onClick={handleBack} className="secondary-btn">
          {t("quiz.timeUpBackHome")}
        </button>
        <button onClick={onOpenHistory} className="share-btn">
            {t("history.viewHistory")}
        </button>
      </motion.div>
    </div>
  );
}