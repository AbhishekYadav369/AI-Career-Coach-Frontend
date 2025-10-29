/**
 * Main entry point for the React application
 * Sets up the React DOM rendering and imports global styles
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/globals.css';
import '../src/styles/variables.css';
import '../src/styles/components/auth.css';
import '../src/styles/components/career.css';
import '../src/styles/components/connection.css';
import '../src/styles/components/gap.css';
import '../src/styles/components/interview.css';
import '../src/styles/components/quiz.css';
import '../src/styles/components/resume.css';
import '../src/styles/components/dashboard.css';
import '../src/styles/components/navbar.css';
import '../src/styles/components/loading-spinner.css';
import '../src/styles/components/toast.css';

import App from './App';

// Create root element and render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);