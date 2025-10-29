/**
 * ProfileSetup Component
 * Multi-step profile completion form
 * Step 1: Personal Details, Step 2: Education, Step 3: Languages
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import LoadingSpinner from '../common/LoadingSpinner';
import { STANDARDS, LANGUAGES } from '../../utils/constants';
import '../../styles/components/auth.css';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { completeProfile } = useUser();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [profileData, setProfileData] = useState({
    personal: {
      fullName: '',
      email: '',
      currentStandard: '',
      phoneNumber: '',
      location: '',
      linkedIn: '',
      gitHub: ''
    },
    education: {
      degree: '',
      university: '',
      location: '',
      graduationYear: new Date().getFullYear().toString()
    },
    languages: {
      native: '',
      additional: []
    }
  });

  const handleChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));

    const errorKey = `${section}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const handleLanguageChange = (languages) => {
    setProfileData(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        additional: languages
      }
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!profileData.personal.fullName) {
          newErrors['personal.fullName'] = 'Full name is required';
        }
        if (!profileData.personal.email) {
          newErrors['personal.email'] = 'Email is required';
        }
        if (!profileData.personal.currentStandard) {
          newErrors['personal.currentStandard'] = 'Current standard is required';
        }
        if (!profileData.personal.phoneNumber) {
          newErrors['personal.phoneNumber'] = 'Phone number is required';
        }
        break;

      case 2:
        if (!profileData.education.degree) {
          newErrors['education.degree'] = 'Degree is required';
        }
        if (!profileData.education.university) {
          newErrors['education.university'] = 'University is required';
        }
        if (!profileData.education.graduationYear) {
          newErrors['education.graduationYear'] = 'Graduation year is required';
        }
        break;

      case 3:
        if (!profileData.languages.native) {
          newErrors['languages.native'] = 'Native language is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleComplete = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      await completeProfile(profileData);
      navigate('/dashboard', {
        state: { message: 'Profile setup completed successfully!' }
      });
    } catch (error) {
      setErrors({ form: 'Failed to save profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
        >
          <div className="step-number">{step}</div>
          <div className="step-title">
            {step === 1 && 'Personal'}
            {step === 2 && 'Education'}
            {step === 3 && 'Languages'}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPersonalDetails = () => (
    <div className="profile-step">
      <h3>Personal Details</h3>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            value={profileData.personal.fullName}
            onChange={(e) => handleChange('personal', 'fullName', e.target.value)}
            className={`form-input ${errors['personal.fullName'] ? 'error' : ''}`}
            placeholder="Enter your full name"
          />
          {errors['personal.fullName'] && (
            <span className="error-text">{errors['personal.fullName']}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            type="email"
            value={profileData.personal.email}
            onChange={(e) => handleChange('personal', 'email', e.target.value)}
            className={`form-input ${errors['personal.email'] ? 'error' : ''}`}
            placeholder="Enter your email"
          />
          {errors['personal.email'] && (
            <span className="error-text">{errors['personal.email']}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Current Standard *</label>
          <select
            value={profileData.personal.currentStandard}
            onChange={(e) => handleChange('personal', 'currentStandard', e.target.value)}
            className={`form-select ${errors['personal.currentStandard'] ? 'error' : ''}`}
          >
            <option value="">Select your current standard</option>
            {STANDARDS.map((standard) => (
              <option key={standard} value={standard}>
                {standard}
              </option>
            ))}
          </select>
          {errors['personal.currentStandard'] && (
            <span className="error-text">{errors['personal.currentStandard']}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input
            type="tel"
            value={profileData.personal.phoneNumber}
            onChange={(e) => handleChange('personal', 'phoneNumber', e.target.value)}
            className={`form-input ${errors['personal.phoneNumber'] ? 'error' : ''}`}
            placeholder="Enter your phone number"
          />
          {errors['personal.phoneNumber'] && (
            <span className="error-text">{errors['personal.phoneNumber']}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Location</label>
        <input
          type="text"
          value={profileData.personal.location}
          onChange={(e) => handleChange('personal', 'location', e.target.value)}
          className="form-input"
          placeholder="Enter your location"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">LinkedIn Profile</label>
          <input
            type="url"
            value={profileData.personal.linkedIn}
            onChange={(e) => handleChange('personal', 'linkedIn', e.target.value)}
            className="form-input"
            placeholder="https://linkedin.com/in/your-profile"
          />
        </div>

        <div className="form-group">
          <label className="form-label">GitHub Profile</label>
          <input
            type="url"
            value={profileData.personal.gitHub}
            onChange={(e) => handleChange('personal', 'gitHub', e.target.value)}
            className="form-input"
            placeholder="https://github.com/your-username"
          />
        </div>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="profile-step">
      <h3>Education Details</h3>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Degree *</label>
          <input
            type="text"
            value={profileData.education.degree}
            onChange={(e) => handleChange('education', 'degree', e.target.value)}
            className={`form-input ${errors['education.degree'] ? 'error' : ''}`}
            placeholder="e.g., Bachelor of Engineering"
          />
          {errors['education.degree'] && (
            <span className="error-text">{errors['education.degree']}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">University *</label>
          <input
            type="text"
            value={profileData.education.university}
            onChange={(e) => handleChange('education', 'university', e.target.value)}
            className={`form-input ${errors['education.university'] ? 'error' : ''}`}
            placeholder="Enter your university name"
          />
          {errors['education.university'] && (
            <span className="error-text">{errors['education.university']}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">University Location</label>
          <input
            type="text"
            value={profileData.education.location}
            onChange={(e) => handleChange('education', 'location', e.target.value)}
            className="form-input"
            placeholder="Enter university location"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Graduation Year *</label>
          <input
            type="number"
            min="1990"
            max="2030"
            value={profileData.education.graduationYear}
            onChange={(e) => handleChange('education', 'graduationYear', e.target.value)}
            className={`form-input ${errors['education.graduationYear'] ? 'error' : ''}`}
            placeholder="YYYY"
          />
          {errors['education.graduationYear'] && (
            <span className="error-text">{errors['education.graduationYear']}</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderLanguages = () => (
    <div className="profile-step">
      <h3>Language Skills</h3>

      <div className="form-group">
        <label className="form-label">Native Language *</label>
        <select
          value={profileData.languages.native}
          onChange={(e) => handleChange('languages', 'native', e.target.value)}
          className={`form-select ${errors['languages.native'] ? 'error' : ''}`}
        >
          <option value="">Select your native language</option>
          {LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        {errors['languages.native'] && (
          <span className="error-text">{errors['languages.native']}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Additional Languages</label>
        <div className="language-selector">
          {LANGUAGES.filter(lang => lang !== profileData.languages.native).map((language) => (
            <label key={language} className="checkbox-label">
              <input
                type="checkbox"
                checked={profileData.languages.additional.includes(language)}
                onChange={(e) => {
                  const newLanguages = e.target.checked
                    ? [...profileData.languages.additional, language]
                    : profileData.languages.additional.filter(l => l !== language);
                  handleLanguageChange(newLanguages);
                }}
              />
              <span className="checkbox-text">{language}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-card">
        <div className="profile-header">
          <h1>Complete Your Profile</h1>
          <p>Help us personalize your career guidance experience</p>
        </div>

        {renderStepIndicator()}

        <div className="profile-content">
          {errors.form && (
            <div className="error-message">
              {errors.form}
            </div>
          )}

          {currentStep === 1 && renderPersonalDetails()}
          {currentStep === 2 && renderEducation()}
          {currentStep === 3 && renderLanguages()}
        </div>

        <div className="profile-actions">
          {currentStep > 1 && (
            <button
              type="button"
              className="btn-secondary"
              onClick={handlePrevious}
              disabled={loading}
            >
              Previous
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              className="btn-primary"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={handleComplete}
              disabled={loading}
            >
              {loading ? <LoadingSpinner size="small" /> : 'Complete Profile'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}