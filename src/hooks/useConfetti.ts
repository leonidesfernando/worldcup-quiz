// src/hooks/useConfetti.ts
import { useEffect } from "react";
import confetti from "canvas-confetti";


export function useConfetti(percentage: number) {
  useEffect(() => {
    if (percentage === 100) {
      // Golden confetti rain for Champion (continuous falling effect)
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 6,
          angle: 55,
          spread: 50,
          origin: { x: 0.15, y: Math.random() * 0.4 },
          colors: ["#fbbf24", "#fde047", "#ffffff", "#f59e0b"],
        });

        confetti({
          particleCount: 6,
          angle: 125,
          spread: 50,
          origin: { x: 0.85, y: Math.random() * 0.4 },
          colors: ["#fbbf24", "#fde047", "#ffffff", "#f59e0b"],
        });

        if (Date.now() < end) requestAnimationFrame(frame);
      };

      frame();
    } 
    else if (percentage >= 80) {
      // Silver confetti burst for 2nd place
      confetti({
        particleCount: 160,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#94a3b8", "#cbd5e1", "#e2e8f0", "#64748b"],
      });
    }
    // No confetti for lower scores
  }, [percentage]);
}