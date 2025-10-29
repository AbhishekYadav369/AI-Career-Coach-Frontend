/**
 * User Context
 * Manages user profile, progress, and application state
 * Handles quiz results, career selections, and completion tracking
 */
import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useLocalStorage('user_progress', {
    profileCompleted: false,
    quizCompleted: false,
    careerOptionsGenerated: false,
    gapAnalysisCompleted: false,
    resumeBuilt: false
  });

  const [profile, setProfile] = useState({
    personal: {
      fullName: '',
      email: '',
      currentStandard: '',
      phoneNumber: '',
      location: '',
      linkedIn: '',
      gitHub: ''
    },
    education: {
      degree: '',
      university: '',
      location: '',
      graduationYear: ''
    },
    languages: {
      native: '',
      additional: []
    }
  });

  const [quizData, setQuizData] = useState({
    answers: [],
    currentQuestion: 0,
    completed: false,
    results: null
  });

  const [selectedCareer, setSelectedCareer] = useState(null);
  const [skillGaps, setSkillGaps] = useState([]);

  const updateProgress = (key, value) => {
    setUserProgress(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const completeProfile = (profileData) => {
    setProfile(profileData);
    updateProgress('profileCompleted', true);
  };

  const completeQuiz = (quizResults) => {
    setQuizData(prev => ({
      ...prev,
      ...quizResults,
      completed: true
    }));
     updateProgress('profileCompleted', true);
    updateProgress('quizCompleted', true);
    updateProgress('careerOptionsGenerated', true);
  };

  const selectCareer = (career) => {
    setSelectedCareer(career);
    updateProgress('gapAnalysisCompleted', true);
  };

  const canAccess = (component) => {
    switch (component) {
      case 'quiz':
        return true;
      case 'career':
        return userProgress.quizCompleted;
      case 'gap':
        return userProgress.careerOptionsGenerated;
      case 'resume':
        return  userProgress.quizCompleted;
        // return userProgress.profileCompleted && userProgress.quizCompleted && userProgress.careerOptionsGenerated;
      case 'connection':
        return true;
      case 'interview':
        return true;
      default:
        return false;
    }
  };

  const value = {
    profile,
    setProfile,
    quizData,
    setQuizData,
    selectedCareer,
    skillGaps,
    userProgress,
    updateProgress,
    completeProfile,
    completeQuiz,
    selectCareer,
    canAccess
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserContext };