/**
 * Form validation utilities
 * Provides consistent validation logic across the application
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} - Whether password meets requirements
 */
export const validatePassword = (password) => {
  return password && password.length >= 5;
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Whether phone number is valid
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[1-9]?[0-9]{7,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is valid
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} - Whether value is present
 */
export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== '';
};