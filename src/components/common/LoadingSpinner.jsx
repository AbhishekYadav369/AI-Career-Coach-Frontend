/**
 * LoadingSpinner Component
 * Reusable loading spinner with different sizes
 * Used throughout the app for loading states
 */
import React from 'react';

export default function LoadingSpinner({ size = 'medium', message = '' }) {
  const sizeClasses = {
    tiny: 'spinner-tiny',
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  return (
    <div className={`loading-spinner ${sizeClasses[size]}`}>
      <div className="spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}