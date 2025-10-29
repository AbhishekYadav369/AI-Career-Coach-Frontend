/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 * Handles JWT token management, login, logout, and user session
 */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as api from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage('career_guidance_token', null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize authentication state on app load
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Verify token and get user data
          const userData = await api.verifyToken(token);
          setUser(userData);
        } catch (error) {
          console.error('Token verification failed:', error);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token, setToken]);

  /**
   * Login function - authenticates user and stores JWT token
   * @param {string} email - User email
   * @param {string} password - User password
   */
  const login = async (email, password) => {
    try {
      const response = await api.login({ email, password });
      setToken(response.token);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /**
   * Register function - creates new user account
   * @param {Object} userData - User registration data
   */
  const register = async (userData) => {
    try {
      const response = await api.register(userData);
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /**
   * Logout function - clears user session and token
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('user_progress');
    localStorage.removeItem('quiz_answers');
    localStorage.clear();
    sessionStorage.clear();
  };

  const isAuthenticated = !!token && !!user;

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };