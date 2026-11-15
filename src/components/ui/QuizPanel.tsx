import React, { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { quizQuestions } from '../../data/quizData';
import { soundManager } from '../../utils/audio';
import '../../styles/QuizPanel.css';

export const QuizPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const currentArea = useGameStore((s) => s.currentArea);
  const submitQuiz = useGameStore((s) => s.submitQuiz);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  // Filter questions for current area, or fallback to all questions
  const currentQuestions =
    quizQuestions.filter((q) => q.area === currentArea).length > 0
      ? quizQuestions.filter((q) => q.area === currentArea)
      : quizQuestions;

  const currentQ = currentQuestions[currentIndex] || currentQuestions[0];
  const isAnswered = selectedAnswer !== null;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      soundManager.playSuccess();
      setScore((s) => s + 1);
    } else {
      soundManager.playAlarm();
    }
    submitQuiz({
      questionId: currentQ.id,
      selectedAnswer: idx,
      correct: isCorrect,
    });
  };

  const handleNext = () => {
    soundManager.playClick();
    setSelectedAnswer(null);
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      onClose();
      setCurrentIndex(0);
    }
  };

  return (
    <div className="quiz-overlay" onClick={onClose}>
      <div className="quiz-card" onClick={(e) => e.stopPropagation()}>
        <div className="quiz-card__header">
          <h2 className="quiz-card__title">
            <span>🧠</span> Défi Connaissances Datacenter
          </h2>
          <span className="quiz-card__score">
            Question {currentIndex + 1}/{currentQuestions.length} • Score : {score}
          </span>
        </div>

        <p className="quiz-card__question">{currentQ.question}</p>

        <div className="quiz-card__options">
          {currentQ.options.map((option, idx) => {
            let className = 'quiz-card__option-btn';
            if (isAnswered) {
              if (idx === currentQ.correctAnswer) {
                className += ' quiz-card__option-btn--correct';
              } else if (idx === selectedAnswer) {
                className += ' quiz-card__option-btn--wrong';
              }
            }
            return (
              <button
                key={idx}
                className={className}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="quiz-card__explanation">
            <strong>
              {selectedAnswer === currentQ.correctAnswer
                ? '✅ Exact !'
                : '❌ Incorrect.'}
            </strong>
            <p style={{ margin: '6px 0 0 0' }}>{currentQ.explanation}</p>
          </div>
        )}

        <div className="quiz-card__footer">
          <button
            className="main-menu__btn"
            style={{ padding: '8px 16px', minWidth: 'auto' }}
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
          >
            Quitter
          </button>
          {isAnswered && (
            <button
              className="main-menu__btn main-menu__btn--primary"
              style={{ padding: '8px 20px', minWidth: 'auto' }}
              onClick={handleNext}
            >
              {currentIndex < currentQuestions.length - 1
                ? 'Question Suivante →'
                : 'Terminer le Défi ✓'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPanel;
