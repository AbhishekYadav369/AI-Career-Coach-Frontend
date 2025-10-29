/**
 * Register Component
 * Handles user registration with email, username, and password
 * Includes real-time validation for email availability and username uniqueness
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import { validateEmail, validatePassword } from '../../utils/validators';
import * as api from '../../utils/api';
import '../../styles/components/auth.css';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState({
      username: false
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

     if (name === 'username' && value && value.length >= 3) {
      await checkUsernameAvailability(value);
    }
  };


  const checkUsernameAvailability = async (username) => {
    setCheckingAvailability(prev => ({ ...prev, username: true }));
    try {
      const isAvailable = await api.checkUsernameAvailability(username);
      if (!isAvailable) {
        setErrors(prev => ({
          ...prev,
          username: 'This username is already taken'
        }));
      }
    } catch (error) {
      console.error('Error checking username availability:', error);
    } finally {
      setCheckingAvailability(prev => ({ ...prev, username: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 5 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await register({
        // email: formData.email,
        username: formData.username,
        password: formData.password
      });

      if (result.success) {
        navigate('/login', {
          state: { message: 'Registration successful! Please sign in.' }
        });
      } else {
        setErrors({ form: result.error || 'Registration failed' });
      }
    } catch (error) {
      setErrors({ form: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Your Account</h1>
          <p>Join thousands of users finding their perfect career</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          {errors.form && (
            <div className="error-message">
              {errors.form}
            </div>
          )}

          
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username or Email
            </label>
            <div className="input-with-indicator">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`form-input ${errors.username ? 'error' : ''}`}
                placeholder="Choose a username"
                disabled={loading}
              />
              {checkingAvailability.username && (
                <div className="availability-indicator checking">
                  <LoadingSpinner size="tiny" />
                </div>
              )}
            </div>
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Create a password (min 5 characters)"
              disabled={loading}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password"
              disabled={loading}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"  // checkingAvailability.email ||
            disabled={loading || checkingAvailability.username}
          >
            {loading ? <LoadingSpinner size="small" /> : 'Create Account'}
          </button>

          <div className="auth-links">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}