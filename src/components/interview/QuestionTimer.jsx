/**
 * QuestionTimer Component
 * Timer for interview questions
 */
import React, { useState, useEffect } from 'react';
import '../../styles/components/interview.css';

export default function QuestionTimer({ question, onTimeUp, onNext }) {
  const [timeRemaining, setTimeRemaining] = useState(question.timeLimit);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      onTimeUp(question.timeLimit);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, onTimeUp, question.timeLimit]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    const timeTaken = question.timeLimit - timeRemaining;
    onTimeUp(timeTaken);
    onNext();
    setTimeRemaining(question.timeLimit);
  };

  const handlePause = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="question-timer">
      <div className="timer-display">
        <div className={`timer-circle ${timeRemaining <= 30 ? 'warning' : ''}`}>
          <span className="timer-text">{formatTime(timeRemaining)}</span>
        </div>
      </div>

      <div className="question-content">
        <div className="question-meta">
          <span className="question-category">{question.category}</span>
          <span className="question-difficulty">{question.difficulty}</span>
        </div>

        <h2 className="question-text">{question.question}</h2>

        <div className="question-hint">
          <p><strong>Suggested approach:</strong> Take a moment to structure your thoughts, then provide specific examples.</p>
        </div>
      </div>

      <div className="timer-controls">
        <button className="btn-secondary" onClick={handlePause}>
          {isActive ? 'Pause' : 'Resume'}
        </button>
        <button className="btn-primary" onClick={handleNext}>
          Next Question
        </button>
      </div>
    </div>
  );
}