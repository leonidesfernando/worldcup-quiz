// src/components/QuizScreen.tsx
import { useState, useEffect, useRef } from "react";
import { generateRandomQuestion } from "../lib/questionGenerator";
import { questionGenerators } from "../lib/questionGeneratorsList";
import { useTranslation } from "../useTranslation";
import { useSettings } from "../components/SettingsContext";
import { useTimer } from "../hooks/useTimer";
import type { QuizQuestion } from "../types/QuizQuestion";
import GoalAnimation from "./GoalAnimation";
import MissAnimation from "./MissAnimation";
import TimeUpScreen from "./TimeUpScreen";
import { AdMobService } from "../service/AdMobService";
import { Utils } from "../utils/Utils";
import ConfirmDialog from "./ConfirmDialog";

const TIMER_DURATION_SECONDS = 120; // 2 minutes

interface Props {
  totalQuestions: number;
  onFinish: (correct: number, total: number) => void;
  onBack: () => void;
  onOpenHistory: () => void;
}

function generateUniqueQuestions(
  total: number,
  generator: () => QuizQuestion,
  maxAttempts = total * 10,
): QuizQuestion[] {
  const questionsByKey = new Map<string, QuizQuestion>();
  let attempts = 0;

  while (questionsByKey.size < total && attempts < maxAttempts) {
    attempts++;
    const q = generator();
    if (!questionsByKey.has(q.question)) {
      questionsByKey.set(q.question, q);
    }
  }

  if (questionsByKey.size < total) {
    throw new Error(
      `Could not generate enough unique questions. Requested: ${total}, generated: ${questionsByKey.size}`,
    );
  }

  return Array.from(questionsByKey.values());
}

// Format seconds as M:SS (e.g. 90 → "1:30")
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function QuizScreen({ totalQuestions, onFinish, onBack, onOpenHistory }: Readonly<Props>) {
  const { t } = useTranslation();
  const { isTimerEnabled, showCorrectAnswer } = useSettings();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // ── Question generation ───────────────────────────
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const generated = generateUniqueQuestions(
      totalQuestions,
      () => generateRandomQuestion(t, Utils.shuffleArray(questionGenerators)),
    );

    setQuestions(generated);
  }, [totalQuestions]); // ← t is omitted on purpose

  // ── Timer ─────────────────────────────────────────
  // Only starts counting once questions are loaded
  const questionsReady = questions.length > 0;

  const { secondsLeft, percentLeft, pause, resume } = useTimer({
    durationSeconds: TIMER_DURATION_SECONDS,
    enabled: isTimerEnabled && questionsReady,
    onExpire: () => setIsTimeUp(true),
  });

  // Pause timer while back-confirm modal is open
  useEffect(() => {
    AdMobService.loadRewarded();
    if (!isTimerEnabled) return;
    if (showBackConfirm) pause();
    else resume();
  }, [showBackConfirm, isTimerEnabled, pause, resume]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (index: number) => {
    if (answered || !currentQuestion) return;
    setSelectedIndex(index);
    setAnswered(true);
    if (index === currentQuestion.correctAnswerIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswered(false);
      setSelectedIndex(null);
    } else {
      onFinish(correctCount, totalQuestions);
    }
  };

  const handleBackClick   = () => setShowBackConfirm(true);
  const handleConfirmBack = async () => {
    // Show a rewarded/interstitial ad when the user abandons mid-round.
    // onBack() is always called even if the ad fails — navigation is never blocked.
    await AdMobService.showRewarded(() => {});
    onBack();
  };
  const handleCancelBack  = () => setShowBackConfirm(false);

  // ── Time-up screen ────────────────────────────────
  if (isTimeUp) {
    return (
      <TimeUpScreen
        correctCount={correctCount}
        totalQuestions={totalQuestions}
        onFinish={() => onFinish(correctCount, totalQuestions)}
        onBack={onBack}
        onOpenHistory={onOpenHistory}
      />
    );
  }

  // ── Skeleton ──────────────────────────────────────
  if (!currentQuestion) {
    return (
      <div className="quiz-card quiz-skeleton">
        <div className="quiz-header">
          <div className="skeleton-block" style={{ width: "60px", height: "20px" }} />
          <div className="skeleton-block" style={{ width: "40px", height: "20px" }} />
        </div>
        <div className="question-header">
          <div className="skeleton-block" style={{ width: "80px", height: "18px" }} />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div className="skeleton-block" style={{ width: "60px", height: "22px", borderRadius: "9999px" }} />
            <div className="skeleton-block" style={{ width: "50px", height: "22px", borderRadius: "9999px" }} />
          </div>
        </div>
        <div className="skeleton-block" style={{ width: "100%", height: "56px", marginBottom: "2rem" }} />
        <div className="options-list">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-block skeleton-option" />
          ))}
        </div>
      </div>
    );
  }

  const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;
  const isUrgent  = isTimerEnabled && secondsLeft <= 30;

  return (
    <>
      {/* ── Back confirmation modal ───────────────── */}

      <ConfirmDialog
        isOpen={showBackConfirm}
        titleKey="quiz.backConfirmTitle"
        messageKey="quiz.backConfirmMessage"
        confirmTextKey="quiz.backConfirmLeave"
        confirmVariant="danger"
        onConfirm={handleConfirmBack}
        onCancel={handleCancelBack}
      />


      {/* ── Quiz card ────────────────────────────── */}
      <div className="quiz-card">

        {/* Timer — only rendered when enabled */}
        {isTimerEnabled && (
          <div
            className="quiz-timer"
            aria-label={`${secondsLeft} seconds remaining`}
            aria-live="polite"
          >
            <div className="quiz-timer__track">
              <div
                className={`quiz-timer__bar${isUrgent ? " quiz-timer__bar--urgent" : ""}`}
                style={{ width: `${percentLeft}%` }}
              />
            </div>
            <span className={`quiz-timer__label${isUrgent ? " quiz-timer__label--urgent" : ""}`}>
              ⏱ {formatTime(secondsLeft)}
            </span>
          </div>
        )}

        <div className="quiz-header">
          <div className="quiz-header-line">
          <button onClick={handleBackClick} className="back-btn">
            &larr; {t("quiz.back")}
          </button>
          <span className="score-display">
            <span className="history-score-correct">{correctCount}</span> / {totalQuestions}
          </span>
          </div>

        </div>

        {/* Progress + Category + Difficulty Badges */}
        <div className="question-header">
          <div className="progress">
            {t("quiz.question")} {currentIndex + 1}/{totalQuestions}
          </div>
          <div className="badges">
            <span className="badge category-badge">
              {currentQuestion.category}
            </span>
            <span
              className={`badge difficulty-badge ${currentQuestion.difficultyClass?.toLowerCase()}`}
            >
              {currentQuestion.difficulty}
            </span>
          </div>
        </div>

        <h2 className="question-text">{currentQuestion.question}</h2>

        <div className="options-list">
          {currentQuestion.options.map((option, index) => {
            const isSelected     = index === selectedIndex;
            const isCorrectAnswer = index === currentQuestion.correctAnswerIndex;

            let className = "option-btn";
            if (answered) {
              // Only highlight the correct answer if the setting is ON
              if (isCorrectAnswer && showCorrectAnswer) className += " correct";
              else if (isSelected && !isCorrectAnswer)  className += " wrong";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={className}
              >
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="feedback-box">
            <p
              className={`feedback-title ${isCorrect ? "feedback-correct" : "feedback-wrong"}`}
            >
              {isCorrect ? t("quiz.correct") : t("quiz.wrong")}
            </p>

            {isCorrect && (
              <GoalAnimation
                onComplete={() => console.log("Goal animation finished")}
              />
            )}
            {!isCorrect && (
              <MissAnimation onComplete={() => console.log("Miss done")} />
            )}

            <button onClick={goToNext} className="next-btn">
              {currentIndex < questions.length - 1
                ? t("quiz.next")
                : t("quiz.finish")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}