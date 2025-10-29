import React from 'react';
import '../../styles/components/quiz.css';

export default function QuizQuestion({ question, answer, onAnswerChange, questionNumber,
  onNext, onPrevious, isLastQuestion, isFirstQuestion, isCurrentQuestionAnswered, onComplete, loading
}) {

  const handleTextChange = (e) => {
    onAnswerChange(e.target.value);
  };

  return (
    <div className="quiz-question">
      <div className="question-header">
        <span className="question-category">{question.category}</span>
        <span className="question-number">Question {questionNumber}</span>
      </div>

      <h2 className="question-text">{question.question}</h2>

      <div className="question-content">
        <textarea
          className="text-answer"
          placeholder="Type your answer here..."
          value={answer}
          onChange={handleTextChange}
          rows={4}
        />
      </div>

      <div className="question-actions">
        <button
          className="quiz-nav-btn secondary"
          onClick={onPrevious}
          disabled={isFirstQuestion}
        >
          Previous
        </button>

      
        {!isLastQuestion ? (
          <button
            className="quiz-nav-btn primary"
            onClick={onNext}
            disabled={!isCurrentQuestionAnswered}
          >
            Next
          </button>
        ) : (
          <button
            className="quiz-nav-btn primary"
            onClick={onComplete}
            disabled={!isCurrentQuestionAnswered || loading}
          >
            {loading ? 'Submitting...' : 'Complete Quiz'}
          </button>
        )}
      </div>
    </div>
  );
}
