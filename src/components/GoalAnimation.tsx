// src/components/GoalAnimation.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "../useTranslation";
import soccerBall from "../assets/soccer-ball.png";

interface Props {
  onComplete?: () => void;
}

export default function GoalAnimation({ onComplete }: Readonly<Props>) {
  const { t } = useTranslation();

  // Single visibility state for the whole animation
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-complete & fade out after 2.6 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete?.(), 600); // extra time for exit animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="goal-animation-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          {/* Ball flies in */}
          <motion.img
            src={soccerBall}
            className="soccer-ball"
            initial={{ x: "-120vw", rotate: -360, scale: 0.7 }}
            animate={{
              x: "30vw",
              rotate: 720,
              scale: 1.1,
            }}
            transition={{
              duration: 2.0,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Ripple (optional - keep if you like it) */}
          <motion.div
            className="net-ripple"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.8, opacity: [0, 0.7, 0] }}
            transition={{ delay: 1.1, duration: 1.1, ease: "easeOut" }}
          />

          {/* Green flash */}
          <motion.div
            className="flash-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            transition={{ duration: 3.5, times: [0, 0.1, 3] }}
          />

          {/* "GOAL!" text - delayed entrance, stays visible, smooth exit */}
          <motion.div
            className="goal-text"
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={{ scale: 1.2, opacity: 1, y: 0 }}
            transition={{
              delay: 1.0,               // ← 1 second delay before text appears
              type: "spring",
              stiffness: 120,
              damping: 12,
            }}
          >
            {t("results.goal")}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}