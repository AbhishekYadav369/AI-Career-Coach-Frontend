/**
 * Dummy data for development and testing
 * Contains sample data for all application features
 */

export const STANDARDS = ['HSC', 'SSC', 'Diploma', 'Graduate'];

export const LANGUAGES = [
  'English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 
  'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Odia'
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: 'Work Style',
    question: 'What type of work environment do you prefer?',
    type: 'multiple_choice',
    options: ['Team-based collaborative', 'Independent work', 'Mixed team and solo', 'Leadership roles']
  },
  {
    id: 2,
    category: 'Skills',
    question: 'Rate your technical skills (1-10)',
    type: 'slider',
    min: 1,
    max: 10
  },
  {
    id: 3,
    category: 'Interests',
    question: 'Which areas interest you most? (Select multiple)',
    type: 'multi_select',
    options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Creative Arts', 'Engineering', 'Business', 'Science Research']
  },
  {
    id: 4,
    category: 'Work Style',
    question: 'How do you prefer to receive feedback?',
    type: 'multiple_choice',
    options: ['Regular structured reviews', 'Continuous informal feedback', 'Self-assessment focused', 'Peer feedback preferred']
  },
  {
    id: 5,
    category: 'Career Goals',
    question: 'What motivates you most in your career?',
    type: 'multiple_choice',
    options: ['Financial growth', 'Work-life balance', 'Learning opportunities', 'Making an impact']
  }
];

export const CAREER_OPTIONS = [
  {
    id: 1,
    title: 'Software Developer',
    description: 'Design and develop software applications and systems',
    salaryRange: '$60,000 - $120,000',
    growthProspect: 'High',
    requiredSkills: ['Programming', 'Problem Solving', 'Technical Communication'],
    matchPercentage: 92,
    industry: 'Technology'
  },
  {
    id: 2,
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make decisions',
    salaryRange: '$70,000 - $140,000',
    growthProspect: 'Very High',
    requiredSkills: ['Statistics', 'Python/R', 'Machine Learning', 'Data Visualization'],
    matchPercentage: 88,
    industry: 'Technology'
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    description: 'Design user interfaces and experiences for digital products',
    salaryRange: '$50,000 - $100,000',
    growthProspect: 'High',
    requiredSkills: ['Design Tools', 'User Research', 'Prototyping', 'Creative Thinking'],
    matchPercentage: 78,
    industry: 'Design'
  }
];

export const SKILL_GAPS = [
  { skill: 'Programming', current: 6, required: 9, priority: 'High' },
  { skill: 'Database Management', current: 4, required: 8, priority: 'Medium' },
  { skill: 'Project Management', current: 3, required: 7, priority: 'Medium' },
  { skill: 'Communication', current: 7, required: 8, priority: 'Low' }
];

export const RESUME_TEMPLATES = [
  { id: 1, name: 'Professional', description: 'Clean, traditional format suitable for corporate roles' },
  { id: 2, name: 'Creative', description: 'Modern design for creative industries' },
  { id: 3, name: 'Minimal', description: 'Simple, elegant layout focusing on content' }
];

export const CONNECTIONS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    relevance: 'High',
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
    mutualConnections: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Data Science Manager',
    company: 'DataFlow Inc',
    location: 'New York, NY',
    relevance: 'High',
    linkedinUrl: 'https://linkedin.com/in/michaelchen',
    mutualConnections: 3
  }
];

export const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    category: 'Technical',
    difficulty: 'Medium',
    question: 'Explain the difference between supervised and unsupervised learning in machine learning.',
    careerPath: 'Data Science',
    timeLimit: 120
  },
  {
    id: 2,
    category: 'Behavioral',
    difficulty: 'Easy',
    question: 'Tell me about a time when you had to work with a difficult team member.',
    careerPath: 'General',
    timeLimit: 180
  }
];