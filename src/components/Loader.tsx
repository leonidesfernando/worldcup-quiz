// src/components/Loader.tsx
import "./Loader.css";
import soccerBall from "../assets/soccer-ball.png";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  message?: string;
  size?: number;
  fullScreen?: boolean;
}

export default function Loader({
  message = "Preparing questions...",
  size = 72,
  fullScreen = true,
}: Readonly<Props>) {
  return (
    <AnimatePresence>
      <motion.div
        className={`loader-overlay ${fullScreen ? "full-screen" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="loader-container">
          {/* Spinning Soccer Ball */}
          <motion.div
            className="soccer-spinner"
            animate={{
              x: [-120, 120],
              rotate: [0, 1080],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <img src={soccerBall} alt="Loading" width={size} height={size} />
          </motion.div>

          {/* Professional Message */}
          {message && (
            <motion.p
              className="loader-message"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {message}
            </motion.p>
          )}

          {/* Subtle progress dots */}
          <motion.div
            className="loading-dots"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            •••
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
