/**
 * Navbar Component
 * Main navigation bar with conditional access control
 * Shows locked/unlocked states based on user progress
 */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { canAccess, userProgress } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavClass = (component) => {
    const baseClass = 'nav-item';
    if (!canAccess(component)) return `${baseClass} disabled`;
    return baseClass;
  };

  const getProgressIndicator = (component) => {
    const isCompleted = () => {
      switch (component) {
        case 'quiz':
          return userProgress.quizCompleted;
        case 'career':
          return userProgress.careerOptionsGenerated;
        case 'gap':
          return userProgress.gapAnalysisCompleted;
        case 'resume':
          return userProgress.resumeBuilt;
        default:
          return false;
      }
    };

    const isAccessible = canAccess(component);
    const completed = isCompleted();

    if (completed) {
      return <span className="progress-indicator completed">✓</span>;
    } else if (isAccessible) {
      return <span className="progress-indicator accessible">○</span>;
    } else {
      return <span className="progress-indicator locked">🔒</span>;
    }
  };

  return (
    <nav className="main-navbar">
      <div className="navbar-brand">
        <NavLink to="/dashboard" className="brand-link">
          <h2>AI Career Guide</h2>
        </NavLink>
      </div>

      <div className="navbar-nav">
        <NavLink
          to="/quiz"
          className={getNavClass('quiz')}
        >
          {getProgressIndicator('quiz')}
          <span>Attempt Quiz</span>
        </NavLink>

        <NavLink
          to="/career"
          className={getNavClass('career')}
          onClick={(e) => !canAccess('career') && e.preventDefault()}
        >
          {getProgressIndicator('career')}
          <span>Career Options</span>
        </NavLink>

        <NavLink
          to="/gap"
          className={getNavClass('gap')}
          onClick={(e) => !canAccess('gap') && e.preventDefault()}
        >
          {getProgressIndicator('gap')}
          <span>Gap Analysis</span>
        </NavLink>

        <NavLink
          to="/resume"
          className={getNavClass('resume')}
          onClick={(e) => !canAccess('resume') && e.preventDefault()}
        >
          {getProgressIndicator('resume')}
          <span>Resume Builder</span>
        </NavLink>

        {/* <NavLink
          to="/connection"
          className={getNavClass('connection')}
        >
          {getProgressIndicator('connection')}
          <span>Industry Connection</span>
        </NavLink> */}

        {/* <NavLink
          to="/interview"
          className={getNavClass('interview')}
        >
          {getProgressIndicator('interview')}
          <span>Interview Prep</span>
        </NavLink> */}
      </div>

      <div className="navbar-user">
        <div className="user-info">
          <span className="user-name">Welcome, {user?.username}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}