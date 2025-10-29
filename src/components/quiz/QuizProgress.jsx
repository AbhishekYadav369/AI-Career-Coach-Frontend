
/**
 * AttemptQuiz Component
 * Main quiz component with multiple question types and progress tracking
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import QuizQuestion from './QuizQuestion';
import QuizProgress from './QuizProgress';
import LoadingSpinner from '../common/LoadingSpinner';
import '../../styles/components/quiz.css';
import axios from 'axios';

export default function AttemptQuiz() {
  const navigate = useNavigate();
  const { completeQuiz, quizData } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(quizData.answers || []);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(quizData.completed || false);
  const [questions, setQuestions] = useState([]);
  const [apiData, setApiData] = useState(null); // store original API data

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Start quiz and fetch questions from API
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);

    const token = sessionStorage.getItem("token");

    axios.get(`http://localhost:8080/career/quiz?grade=HSC`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      const apiRes = res.data;
      setApiData(apiRes);

      // Flatten questions for rendering
      const flatQuestions = Object.entries(apiRes.sections).flatMap(([sectionName, sectionQuestions]) => {
        const category = sectionName.replace(/^Section\s*\d*:\s*/, "").trim();
        return sectionQuestions.map(q => ({
          id: q.id,
          category,
          question: q.question,
          type: "text" // all user inputs will be text
        }));
      });

      setQuestions(flatQuestions);
    })
    .catch(err => console.error(err));
  };

  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: currentQuestion.id,
      answer,
      timestamp: new Date().toISOString()
    };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleCompleteQuiz = async () => {
    setLoading(true);
    try {
      if (!apiData) return;

      // Map answers back to section structure
      const sectionsWithAnswers = {};
      Object.entries(apiData.sections).forEach(([sectionName, sectionQuestions]) => {
        sectionsWithAnswers[sectionName] = sectionQuestions.map((q, index) => {
          const answerObj = answers.find(a => a.questionId === q.id);
          return {
            ...q,
            answer: answerObj ? answerObj.answer : ""
          };
        });
      });

      const payload = {
        ...apiData,
        sections: sectionsWithAnswers
      };

      const token = sessionStorage.getItem("token");
      await axios.post(`http://localhost:8080/career/quiz?grade=HSC`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Optionally store in context
      await completeQuiz({
        answers,
        completedAt: new Date().toISOString()
      });

      navigate('/career');
    } catch (error) {
      console.error('Error completing quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentAnswer = () => {
    const answerObj = answers.find(a => a.questionId === currentQuestion?.id);
    return answerObj ? answerObj.answer : "";
  };

  const isCurrentQuestionAnswered = () => {
    const answer = getCurrentAnswer();
    return answer !== null && answer !== undefined && answer !== '';
  };

  // If the quiz hasn't been started yet, show the start screen
  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-intro">
          <div className="quiz-intro-content">
            <h1>Personality Test</h1>
            <p>
              This comprehensive assessment will help us understand your
              interests, skills, and career preferences.
            </p>

            <div className="quiz-info">
              <div className="quiz-stat">
                <h3>{questions.length || " Total 10-20 Questions"}</h3>
                <p>Questions are short and designed to understand your personality</p>
              </div>
            </div>

            <button className="btn-primary btn-large" onClick={handleStartQuiz}>
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If quiz was started but backend returned no questions, show a helpful message
  if (quizStarted && questions.length ==0) {
    return (
      <div className="quiz-container">
        <div className="quiz-intro">
          <div className="quiz-intro-content">
            <h2>No questions available</h2>
            <p>The quiz currently has no questions. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <QuizProgress
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          percentage={(currentQuestionIndex + 1) / questions.length * 100}
        />

        <div className="quiz-question-container">
          <QuizQuestion
            question={currentQuestion}
            answer={getCurrentAnswer()}
            onAnswerChange={handleAnswerChange}
            questionNumber={currentQuestionIndex + 1}
          />
        </div>

        <div className="quiz-navigation">
          <button
            className="btn-secondary"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          <div className="quiz-nav-info">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>

          {!isLastQuestion ? (
            <button
              className="btn-primary"
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
            >
              Next
            </button>
          ) : (
            <button
              className="btn-primary"
              onClick={handleCompleteQuiz}
              disabled={!isCurrentQuestionAnswered() || loading}
            >
              {loading ? <LoadingSpinner size="small" /> : 'Complete Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
