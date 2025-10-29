/**
 * Main App component - Entry point for the application
 * Sets up providers and routing for the entire application
 */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import AppRouter from './router';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <AppRouter />
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;