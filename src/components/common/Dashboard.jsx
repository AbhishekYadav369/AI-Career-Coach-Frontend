/**
 * Dashboard Component
 * Clean modern UI with consistent alignment and visual hierarchy
 */
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Navbar from "./Navbar";

export default function Dashboard() {
  const { userProgress, canAccess, selectedCareer } = useUser();

  const getCompletionPercentage = () => {
    const totalSteps = 4;
    let completedSteps = 0;
    if (userProgress.profileCompleted) completedSteps++;
    if (userProgress.quizCompleted) completedSteps++;
    if (userProgress.careerOptionsGenerated) completedSteps++;
    if (userProgress.gapAnalysisCompleted) completedSteps++;
    return Math.round((completedSteps / totalSteps) * 100);
  };

  const completion = getCompletionPercentage();

  return (
    <div className="dashboard-container">
      <Navbar />

      <main className="dashboard-content">
        <section className="dashboard-welcome">
          <h1>Welcome to Your Career Journey</h1>
          <p>Track your progress and access personalized career tools</p>
        </section>

        {/* Progress Overview */}
        <section className="progress-overview">
          <h3>Overall Progress</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completion}%` }}></div>
          </div>
          <p className="progress-text">{completion}% Complete</p>
        </section>

        {/* Dashboard Cards */}
        <section className="dashboard-grid">
          {[
            {
              title: "Profile Setup",
              completed: userProgress.profileCompleted,
              ready: true,
              path: "/profile",
              text: userProgress.profileCompleted ? "Completed" : "Pending",
              btn: userProgress.profileCompleted ? "View Profile" : "Complete Profile",
            },
            {
              title: "Quiz Assessment",
              completed: userProgress.quizCompleted,
              ready: true,
              path: "/quiz",
              text: userProgress.quizCompleted ? "Completed" : "Ready to Start",
              btn: userProgress.quizCompleted ? "Review Quiz" : "Start Quiz",
            },
            {
              title: "Career Options",
              completed: userProgress.careerOptionsGenerated,
              ready: canAccess("career"),
              path: "/career",
              text: userProgress.careerOptionsGenerated
                ? "Generated"
                : canAccess("career")
                ? "Ready to Explore"
                : "Complete Quiz First",
              btn: "Explore Careers",
            },
            {
              title: "Gap Analysis",
              completed: userProgress.gapAnalysisCompleted,
              ready: canAccess("gap"),
              path: "/gap",
              text: userProgress.gapAnalysisCompleted
                ? "Completed"
                : canAccess("gap")
                ? "Ready to Analyze"
                : "Select Career First",
              btn: "Analyze Skills",
            },
            {
              title: "Resume Builder",
              completed: userProgress.resumeBuilt,
              ready: canAccess("resume"),
              path: "/resume",
              text: userProgress.resumeBuilt
                ? "Built"
                : canAccess("resume")
                ? "Ready to Build"
                : "Complete Prerequisites",
              btn: "Build Resume",
            },
            // {
            //   title: "Industry Connections",
            //   completed: true,
            //   ready: true,
            //   path: "/connection",
            //   text: "Always Available",
            //   btn: "Find Connections",
            // },
            // {
            //   title: "Interview Preparation",
            //   completed: true,
            //   ready: true,
            //   path: "/interview",
            //   text: "Always Available",
            //   btn: "Practice Interviews",
            // },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`dashboard-card ${
                card.completed ? "completed" : !card.ready ? "locked" : ""
              }`}
            >
              <h3>{card.title}</h3>
              <p className={`status ${card.completed ? "completed" : card.ready ? "ready" : "locked"}`}>
                {card.text}
              </p>
              {card.ready && (
                <Link to={card.path} className="btn-primary">
                  {card.btn}
                </Link>
              )}
            </div>
          ))}
        </section>

        {/* Selected Career */}
        {selectedCareer && (
          <section className="career-overview">
            <h3>Your Selected Career Path</h3>
            <div className="career-summary">
              <h4>{selectedCareer.title}</h4>
              <p>{selectedCareer.description}</p>
              <div className="career-stats">
                <span>Match: {selectedCareer.matchPercentage}%</span>
                <span>Salary: {selectedCareer.salaryRange}</span>
                <span>Growth: {selectedCareer.growthProspect}</span>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
