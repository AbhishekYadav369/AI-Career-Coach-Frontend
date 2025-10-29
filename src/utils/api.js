/**
 * API service layer for backend communication
 * Handles all HTTP requests with JWT authentication
 */

import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/career/';

/**
 * Generic API request function
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @returns {Promise} - API response
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add JWT token if available
  const token = localStorage.getItem('career_guidance_token');
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Login user
 * @param {Object} credentials - User credentials
 * @returns {Promise} - Login response with JWT token
 */
export const login = async (credentials) => {
  // Mock implementation for development
  return new Promise((resolve, reject) => {

axios.post(`${API_BASE_URL}login`,{
    username: credentials.email,
    password: credentials.password
  }
).then((res) => {
console.log(res.data);
sessionStorage.setItem("token",res.data.BearerToken);
sessionStorage.setItem("userid",res.data.UserId);
   if (res.data.BearerToken && res.data.UserId) {
        resolve({
          token: res.data.BearerToken,
          user: { id: res.data.UserId, username: credentials.email, email: 'demo@example.com' }
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
  
}).catch((err)=>{
  console.log(err);
})

   
  });
  
};

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @returns {Promise} - Registration response
 */
export const register = async (userData) => {
  try {
       
    const response = await axios.post(`${API_BASE_URL}register`, userData, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Return the backend response data (adjust if your backend returns a different shape)
    return response.data;
  } catch (error) {
    console.error('Register request failed:', error);
    // Normalize error for callers
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || JSON.stringify(error.response.data));
    }
    throw error;
  }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {Promise} - User data
 */
export const verifyToken = async (token) => {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, username: 'demo', email: 'demo@example.com' });
    }, 500);
  });

};

/**
 * Check email availability
 * @param {string} email - Email to check
 * @returns {Promise} - Availability status
 */
export const checkEmailAvailability = async (email) => {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email !== 'taken@example.com');
    }, 500);
  });
};

/**
 * Check username availability
 * @param {string} username - Username to check
 * @returns {Promise} - Availability status
 */
export const checkUsernameAvailability = async (username) => {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(username !== 'taken');
    }, 500);
  });
};