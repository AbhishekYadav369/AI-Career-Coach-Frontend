// /**
//  * InterviewPreparation Component
//  * Timer-based interview practice
//  */
// import React, { useState } from 'react';
// import Navbar from '../common/Navbar';
// import QuestionTimer from './QuestionTimer';
// import PerformanceTracker from './PerformanceTracker';
// import { INTERVIEW_QUESTIONS } from '../../data/dummyData';
// import '../../styles/components/interview.css';

// export default function InterviewPreparation() {
//   const [sessionActive, setSessionActive] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [performance, setPerformance] = useState({
//     questionsAnswered: 0,
//     totalTime: 0,
//     averageTime: 0
//   });

//   const startSession = () => {
//     const randomQuestion = INTERVIEW_QUESTIONS[Math.floor(Math.random() * INTERVIEW_QUESTIONS.length)];
//     setCurrentQuestion(randomQuestion);
//     setSessionActive(true);
//   };

//   const endSession = (timeTaken) => {
//     setSessionActive(false);
//     setPerformance(prev => ({
//       questionsAnswered: prev.questionsAnswered + 1,
//       totalTime: prev.totalTime + timeTaken,
//       averageTime: Math.round((prev.totalTime + timeTaken) / (prev.questionsAnswered + 1))
//     }));
//     setCurrentQuestion(null);
//   };

//   const nextQuestion = () => {
//     const randomQuestion = INTERVIEW_QUESTIONS[Math.floor(Math.random() * INTERVIEW_QUESTIONS.length)];
//     setCurrentQuestion(randomQuestion);
//   };

//   return (
//     <div className="interview-container">
//       <Navbar />

//       <div className="interview-content">
//         <div className="interview-header">
//           <h1>Interview Preparation</h1>
//           <p>Practice with timer-based questions</p>
//         </div>

//         <div className="interview-layout">
//           <div className="interview-main">
//             {!sessionActive ? (
//               <div className="session-start">
//                 <h2>Ready to Practice?</h2>
//                 <p>
//                   Practice answering interview questions with a timer to improve 
//                   your response speed and confidence.
//                 </p>

//                 <div className="question-types">
//                   <div className="question-type">
//                     <h3>Technical Questions</h3>
//                     <p>Role-specific technical challenges</p>
//                   </div>
//                   <div className="question-type">
//                     <h3>Behavioral Questions</h3>
//                     <p>Situational and experience-based questions</p>
//                   </div>
//                   <div className="question-type">
//                     <h3>General Questions</h3>
//                     <p>Common interview questions for all roles</p>
//                   </div>
//                 </div>

//                 <button className="btn-primary btn-large" onClick={startSession}>
//                   Start Practice Session
//                 </button>
//               </div>
//             ) : (
//               <QuestionTimer
//                 question={currentQuestion}
//                 onTimeUp={endSession}
//                 onNext={nextQuestion}
//               />
//             )}
//           </div>

//           <div className="interview-sidebar">
//             <PerformanceTracker performance={performance} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }