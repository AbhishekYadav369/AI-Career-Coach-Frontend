
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Navbar from '../common/Navbar';
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
  const [apiData, setApiData] = useState(null); // to store full quiz structure

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // ✅ Fetch quiz from backend
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);

    const token = sessionStorage.getItem("token");

    axios
      .get(`http://localhost:8080/career/quiz?grade=SSC`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const apiRes = res.data;
        setApiData(apiRes);

        // Flatten nested sections → question array
        const flatQuestions = Object.entries(apiRes.sections).flatMap(
          ([sectionName, sectionQuestions]) => {
            const category = sectionName.replace(/^Section\s*\d*:\s*/, "").trim();
            return sectionQuestions.map((q) => ({
              id: q.id,
              section: sectionName,
              category,
              question: q.question,
              type: "text",
            }));
          }
        );

        setQuestions(flatQuestions);
      })
      .catch((err) => console.error("Error fetching quiz:", err));
  };

  // ✅ Capture user's answer
  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: currentQuestion.id,
      section: currentQuestion.section,
      question: currentQuestion.question,
      answer,
    };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // ✅ Submit quiz responses to backend
  const handleCompleteQuiz = async () => {
    if (!apiData) return;
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");
      const userid = sessionStorage.getItem("userid");

      // Rebuild answers into section-wise structure
      const sectionAnswers = {};
      Object.keys(apiData.sections).forEach((sectionName) => {
        const sectionQuestions = apiData.sections[sectionName];
        sectionAnswers[sectionName] = sectionQuestions.map((q) => {
          const ans = answers.find((a) => a.questionId === q.id);
          return {
            id: q.id,
            question: q.question,
            answer: ans ? ans.answer : "",
          };
        });
      });

      const payload = {
        id: apiData.id,
        grade: apiData.grade,
        sections: sectionAnswers,
      };

      console.log("📤 Sending quiz results:", payload);

      await axios.post(`http://localhost:8080/career/quizData?userId=${userid}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((re)=>{
        alert("Success");
      }).catch((err)=>{
        alert("error");
      })

      // Optional local complete state
      await completeQuiz({
        answers,
        completedAt: new Date().toISOString(),
      });

      navigate("/career");
    } catch (error) {
      console.error("❌ Error submitting quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentAnswer = () => {
    const answerObj = answers.find(
      (a) => a.questionId === currentQuestion?.id
    );
    return answerObj ? answerObj.answer : "";
  };

  const isCurrentQuestionAnswered = () => {
    const answer = getCurrentAnswer();
    return answer && answer.trim() !== "";
  };

  // ✅ Show start screen
 if (!quizStarted || questions.length === 0) {
    return (
      <div>
        <Navbar />
        <div className={`quiz-container ${quizStarted ? 'quiz-started' : ''}`} style={{ width: '100%', maxWidth: '100vw' }}>
          <div className="quiz-intro" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: 'calc(100vh - 64px)' // Adjust this value based on your navbar height
          }}>
            <div className="quiz-intro-content" style={{
              maxWidth: '600px',
              margin: '0 auto',
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <h1>Personality Test</h1>
              <p style={{ marginBottom: '1.5rem' }}>
                This comprehensive assessment will help us understand your
                interests, skills, and career preferences.
              </p>

              <div className="quiz-info">
                <div className="quiz-stat">
                  <h3>{questions.length || " Total 10-20 Questions"}</h3>
                  <p>Questions are shorts and design to understand your personality</p>
                </div>
              </div>

              <button
                className="btn-primary btn-large"
                onClick={handleStartQuiz}
                style={{ marginTop: '1.5rem' }}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  // ✅ Quiz running screen
  return (
    <div>
      <Navbar />
    <div className={`quiz-container ${quizStarted ? 'quiz-started' : ''}`}>
      

      <div className="quiz-content">
        <QuizProgress
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          percentage={
            ((currentQuestionIndex + 1) / questions.length) * 100
          }
        />

        <div className="quiz-question-container">
          <QuizQuestion
            question={currentQuestion}
            answer={getCurrentAnswer()}
            onAnswerChange={handleAnswerChange}
            questionNumber={currentQuestionIndex + 1}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isLastQuestion={isLastQuestion}
            isFirstQuestion={currentQuestionIndex === 0}
            isCurrentQuestionAnswered={isCurrentQuestionAnswered()}
            onComplete={handleCompleteQuiz}
            loading={loading}
          />
        </div>

      </div>
    </div>
    </div>
  );}

