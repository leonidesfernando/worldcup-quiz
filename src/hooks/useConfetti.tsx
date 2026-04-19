// src/hooks/useConfetti.ts
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface Props {
  percentage: number;
  isActive?: boolean;
}

export default function ConfettiEffect({ percentage, isActive = true }: Readonly<Props>) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    if (percentage === 100) {
      setShowConfetti(true);
      // Stop after 3 seconds for champion effect
      const timer = setTimeout(() => setShowConfetti(false), 3500);
      return () => clearTimeout(timer);
    } 
    /*else if (percentage >= 80) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 1500);
      return () => clearTimeout(timer);
    }*/
  }, [percentage, isActive]);

  if (!showConfetti) return null;

  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      //numberOfPieces={percentage === 100 ? 350 : 150}
      numberOfPieces={350}
      recycle={false}
      colors={
        percentage === 100 
          ? ["#fbbf24", "#fde047", "#ffffff", "#f59e0b", "#eab308"]
          : ["#94a3b8", "#cbd5e1", "#e2e8f0", "#64748b"]
      }
      gravity={0.15}
      initialVelocityY={-10}
    />
  );
}