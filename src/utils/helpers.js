/**
 * Helper utility functions
 * Common utility functions used across the application
 */

/**
 * Format phone number for display
 * @param {string} phone - Raw phone number
 * @returns {string} - Formatted phone number
 */
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Generate random ID
 * @returns {string} - Random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Calculate time difference
 * @param {Date} startTime - Start time
 * @param {Date} endTime - End time
 * @returns {number} - Time difference in minutes
 */
export const calculateTimeDifference = (startTime, endTime) => {
  const diffMs = endTime - startTime;
  return Math.floor(diffMs / (1000 * 60));
};

/**
 * Format salary range for display
 * @param {string} range - Salary range string
 * @returns {string} - Formatted salary range
 */
export const formatSalaryRange = (range) => {
  return range.replace(/\$([0-9]+),([0-9]+)/g, '$$$1,$2');
};