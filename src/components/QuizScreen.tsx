// src/components/QuizScreen.tsx
import { useState, useEffect, useRef } from "react";
import { generateRandomQuestion } from "../lib/questionGenerator";
import { questionGenerators } from "../lib/questionGeneratorsList";
import { useTranslation } from "../useTranslation";
import type { QuizQuestion } from "../types/QuizQuestion";
import GoalAnimation from "./GoalAnimation";
import MissAnimation from "./MissAnimation";

interface Props {
  totalQuestions: number;
  onFinish: (correct: number, total: number) => void;
  onBack: () => void;
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

export default function QuizScreen({ totalQuestions, onFinish, onBack }: Props) {
  const { t } = useTranslation();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

  // ────────────────────────────────────────────────
  // Prevent double generation in StrictMode (React 18+)
  // ────────────────────────────────────────────────
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    /*const generated = Array.from({ length: totalQuestions }, () =>
      generateRandomQuestion(t, questionGenerators),
    );*/

    const generated = generateUniqueQuestions(
      totalQuestions,
      () => generateRandomQuestion(t, questionGenerators),
    );

    setQuestions(generated);
  }, [totalQuestions]); // ← t is omitted on purpose

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

  const handleBackClick = () => {
    setShowBackConfirm(true);
  };

  const handleConfirmBack = () => {
    onBack();
  };

  const handleCancelBack = () => {
    setShowBackConfirm(false);
  };

  // ── Skeleton ──────────────────────────────────────
  if (!currentQuestion) {
    return (
      <div className="quiz-card quiz-skeleton">
        <div className="quiz-header">
          <div className="skeleton-block" style={{ width: '60px', height: '20px' }} />
          <div className="skeleton-block" style={{ width: '40px', height: '20px' }} />
        </div>
        <div className="question-header">
          <div className="skeleton-block" style={{ width: '80px', height: '18px' }} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div className="skeleton-block" style={{ width: '60px', height: '22px', borderRadius: '9999px' }} />
            <div className="skeleton-block" style={{ width: '50px', height: '22px', borderRadius: '9999px' }} />
          </div>
        </div>
        <div className="skeleton-block" style={{ width: '100%', height: '56px', marginBottom: '2rem' }} />
        <div className="options-list">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-block skeleton-option" />
          ))}
        </div>
      </div>
    );
  }

  const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;

  return (
    <>
      {/* ── Back confirmation modal ───────────────── */}
      {showBackConfirm && (
        <div
          className="confirm-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <div className="confirm-dialog">
            <p id="confirm-title" className="confirm-dialog__title">
              {t("quiz.backConfirmTitle")}
            </p>
            <p className="confirm-dialog__message">
              {t("quiz.backConfirmMessage")}
            </p>
            <div className="confirm-dialog__actions">
              <button
                onClick={handleCancelBack}
                className="confirm-dialog__btn confirm-dialog__btn--cancel"
              >
                {t("quiz.backConfirmCancel")}
              </button>
              <button
                onClick={handleConfirmBack}
                className="confirm-dialog__btn confirm-dialog__btn--confirm"
              >
                {t("quiz.backConfirmLeave")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Quiz card ────────────────────────────── */}
      <div className="quiz-card">
        <div className="quiz-header">
          <button onClick={handleBackClick} className="back-btn">
            &larr; {t("quiz.back")}
          </button>
          <div className="score-display">
            {correctCount} / {totalQuestions}
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
            const isSelected = index === selectedIndex;
            const isCorrectAnswer = index === currentQuestion.correctAnswerIndex;

            let className = "option-btn";
            if (answered) {
              if (isCorrectAnswer) className += " correct";
              else if (isSelected) className += " wrong";
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
