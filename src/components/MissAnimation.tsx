// src/components/MissAnimation.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "../useTranslation";
import soccerBall from "../assets/soccer-ball.png"; // same image as correct animation

interface Props {
  onComplete?: () => void;
}

export default function MissAnimation({ onComplete }: Readonly<Props>) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 2800); // total duration before complete fade-out

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="miss-animation-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="miss-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0] }}
            transition={{ duration: 1.8, times: [0, 0.4, 1] }}
          />

          {/* Ball flies toward goal but misses (hits post & bounces away) */}
          <motion.img
            src={soccerBall}
            className="miss-ball"
            initial={{
              x: "-1vw",
              y: "5vh", // starts fairly high
              rotate: -90,
              scale: 0.9,
            }}
            animate={{
              x: "40vw",
              y: "70vh", // flies UP and out (negative y = higher)
              rotate: 360,
              scale: 0.7, // gets smaller as it goes away
            }}
            transition={{
              duration: 2.0,
              ease: [0.42, 0, 0.58, 1], // ease-in-out + upward arc feel
            }}
          />

          <motion.div
            className="miss-text"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1.4, opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 220,
              damping: 12,
            }}
          >
            {t("quiz.miss")}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
