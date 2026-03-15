// src/components/QuizScreen.tsx
import { useState, useEffect } from 'react';
import { generateRandomQuestion } from '../lib/questionGenerator';
import { useTranslation } from '../useTranslation';
import type { QuizQuestion } from '../types/QuizQuestion';

interface Props {
  totalQuestions: number;
  onFinish: (correct: number, total: number) => void;
}

export default function QuizScreen({ totalQuestions, onFinish }: Props) {
  const { t } = useTranslation();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Generate 10 questions once
  useEffect(() => {
    const generated = Array.from({ length: totalQuestions }, () => generateRandomQuestion(t));
    setQuestions(generated);
  }, [t, totalQuestions]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (index: number) => {
    if (answered || !currentQuestion) return;

    setSelectedIndex(index);
    setAnswered(true);

    if (index === currentQuestion.correctAnswerIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswered(false);
      setSelectedIndex(null);
    } else {
      // End of round
      onFinish(correctCount, totalQuestions);
    }
  };

  if (!currentQuestion) {
    return <div className="loading">Loading questions...</div>;
  }

  const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <button onClick={() => window.location.reload()} className="back-btn">
          ← {t('quiz.back')}
        </button>
        <div className="score-display">
          {correctCount} / {totalQuestions}
        </div>
      </div>

      <div className="progress">
        Question {currentIndex + 1} of {totalQuestions}
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
          <p className={`feedback-title ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
            {isCorrect ? t('quiz.correct') : t('quiz.wrong')}
          </p>

          <p className="feedback-answer">
            {t('quiz.correctWas')}{' '}
            <strong>{currentQuestion.options[currentQuestion.correctAnswerIndex]}</strong>
          </p>

          {currentQuestion.explanation && (
            <p className="feedback-explanation">{currentQuestion.explanation}</p>
          )}

          <button onClick={goToNext} className="next-btn">
            {currentIndex < questions.length - 1 ? t('quiz.next') : t('quiz.finish')}
          </button>
        </div>
      )}
    </div>
  );
}