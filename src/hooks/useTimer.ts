// src/hooks/useTimer.ts
import { useState, useEffect, useRef, useCallback } from "react";

interface UseTimerOptions {
  durationSeconds: number;
  enabled: boolean;
  onExpire: () => void;
}

interface UseTimerResult {
  secondsLeft: number;
  percentLeft: number;   // 0–100, useful for the progress bar width
  isRunning: boolean;
  isExpired: boolean;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export function useTimer({
  durationSeconds,
  enabled,
  onExpire,
}: UseTimerOptions): UseTimerResult {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(enabled);
  const [isExpired, setIsExpired] = useState(false);

  // Keep a stable ref to onExpire so we never stale-close over it
  const onExpireRef = useRef(onExpire);
  useEffect(() => { onExpireRef.current = onExpire; }, [onExpire]);

  // Reset everything when enabled state or duration changes
  useEffect(() => {
    setSecondsLeft(durationSeconds);
    setIsExpired(false);
    setIsRunning(enabled);
  }, [enabled, durationSeconds]);

  useEffect(() => {
    if (!isRunning || isExpired) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          setIsExpired(true);
          onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isExpired]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => {
    if (!isExpired) setIsRunning(true);
  }, [isExpired]);

  const reset = useCallback(() => {
    setSecondsLeft(durationSeconds);
    setIsExpired(false);
    setIsRunning(enabled);
  }, [durationSeconds, enabled]);

  return {
    secondsLeft,
    percentLeft: Math.round((secondsLeft / durationSeconds) * 100),
    isRunning,
    isExpired,
    pause,
    resume,
    reset,
  };
}