/**
 * Application routing configuration
 * Handles navigation between different components and protects routes
 */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProfileSetup from './components/auth/ProfileSetup';
import Dashboard from './components/common/Dashboard';
import AttemptQuiz from './components/quiz/AttemptQuiz';
import CareerOptions from './components/career/CareerOptions';
import GapAnalysis from './components/gap/GapAnalysis';
import ResumeBuilder from './components/resume/ResumeBuilder';
import IndustryConnection from './components/connection/IndustryConnection';
import InterviewPreparation from './components/interview/InterviewPreparation';
import ProtectedRoute from './components/common/ProtectedRoute';

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><Navigate to="/dashboard" replace /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute><AttemptQuiz /></ProtectedRoute>} />
      <Route path="/career" element={<ProtectedRoute><CareerOptions /></ProtectedRoute>} />
      <Route path="/gap" element={<ProtectedRoute><GapAnalysis /></ProtectedRoute>} />
      <Route path="/resume" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
      <Route path="/connection" element={<ProtectedRoute><IndustryConnection /></ProtectedRoute>} />
      <Route path="/interview" element={<ProtectedRoute><InterviewPreparation /></ProtectedRoute>} />

      {/* 404 Route */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}