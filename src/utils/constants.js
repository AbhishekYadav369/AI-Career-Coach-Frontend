/**
 * Application constants and configuration
 * Centralized location for app-wide constants
 */

export const STANDARDS = ['HSC', 'SSC', 'Diploma', 'Graduate'];

export const LANGUAGES = [
  'English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 
  'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Odia'
];

export const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Education', 
  'Creative Arts', 'Engineering', 'Business', 'Science Research'
];

export const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];

export const QUESTION_CATEGORIES = ['Technical', 'Behavioral', 'Situational'];

export const QUIZ_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  SLIDER: 'slider',
  MULTI_SELECT: 'multi_select'
};

export const USER_ROLES = {
  STUDENT: 'student',
  PROFESSIONAL: 'professional',
  CAREER_CHANGER: 'career_changer'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'career_guidance_token',
  USER_PROGRESS: 'user_progress',
  QUIZ_ANSWERS: 'quiz_answers',
  SELECTED_CAREER: 'selected_career'
};