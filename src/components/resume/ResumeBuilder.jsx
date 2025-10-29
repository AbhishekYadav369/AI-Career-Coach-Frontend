/**
 * FullResumeForm Component
 * Professional resume form with all sections, dynamic fields, and PDF generation
 */
import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import { useUser } from '../../contexts/UserContext';
import '../../styles/components/resume.css';
import axios from 'axios';

const initialResumeData = {
  personalInformation: {
    fullName: '',
    email: '',
    phoneNumber: '',
    location: '',
    linkedIn: '',
    gitHub: '',
    portfolio: '',
    summary: ''
  },
  achievements: [],
  certifications: [],
  education: [],
  experience: [],
  interests: [],
  languages: [],
  projects: [],
  skills: []
};

export default function FullResumeForm() {
  const { updateProgress } = useUser();
  const [resumeData, setResumeData] = useState(initialResumeData);

  // Handle changes for object fields
  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      const updatedSection = [...resumeData[section]];
      updatedSection[index][field] = value;
      setResumeData(prev => ({ ...prev, [section]: updatedSection }));
    } else {
      setResumeData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    }
  };

  // Add new item to array sections
  const handleAddItem = (section, fields) => {
    const newItem = fields.reduce((acc, f) => ({ ...acc, [f]: '' }), {});
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  // Remove item from array sections
  const handleRemoveItem = (section, index) => {
    const updatedSection = resumeData[section].filter((_, i) => i !== index);
    setResumeData(prev => ({ ...prev, [section]: updatedSection }));
  };

  // Submit form to API to generate PDF
  const handleSubmit = async () => {
    try {
        const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userid");
      updateProgress('resumeBuilt', true);
    
  axios.post(
        `http://localhost:8080/career/resume?userId=${userId}&careerPath=${'Software Engineer'}`,
        resumeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }, responseType: 'arraybuffer',
        }
      ).then((res)=>{
        console.log(res.data);
        const blob = new Blob(
    [res.data],
    { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resume.docx';
  link.click();
  URL.revokeObjectURL(url);
  alert('Resume generated successfully!');
      }).catch((err)=>{
  alert('PDF generation failed');

      })

   } catch (err) {
      console.error(err);
      alert('Failed to generate resume PDF');
    }
  };

  // Render dynamic array sections
  const renderArraySection = (title, section, fields) => (
    <div className="resume-section">
      <h3>{title}</h3>
      {resumeData[section].map((item, idx) => (
        <div key={idx} className="section-item">
          {fields.map(field => (
            <div className="form-group" key={field}>
              <label>{field}</label>
              <input
                type="text"
                value={item[field] || ''}
                onChange={(e) => {
                  const value =
                    field === 'technologiesUsed'
                      ? e.target.value.split(',').map(t => t.trim())
                      : e.target.value;
                  handleChange(section, field, value, idx);
                }}
                placeholder={field === 'technologiesUsed' ? 'Comma separated' : ''}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => handleRemoveItem(section, idx)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="btn-primary" onClick={() => handleAddItem(section, fields)}>
        Add {title}
      </button>
    </div>
  );

  return (
    <div className="resume-form-container">
      <Navbar />
      <h1>Build Your Resume</h1>
      <div className="resume-form">
        {/* Personal Information */}
        <div className="resume-section">
          <h3>Personal Information</h3>
          <div className="personal-info-grid">
            {['fullName', 'email', 'phoneNumber', 'location', 'linkedIn', 'gitHub', 'portfolio'].map(field => (
              <div className="form-group" key={field}>
                <label className="resume-form-label">{field === 'gitHub' ? 'GitHub' : field === 'linkedIn' ? 'LinkedIn' : field}</label>
                <input
                  className="resume-form-input compact"
                  type="text"
                  value={resumeData.personalInformation[field]}
                  onChange={(e) => handleChange('personalInformation', field, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Achievements (compact row layout) */}
        <div className="resume-section">
          {resumeData.achievements.length === 0 ? (
            <div className="resume-section-header">
              <h3 className="resume-section-title">Achievements</h3>
              <button
                type="button"
                className="btn-primary"
                onClick={() => handleAddItem('achievements', ['title', 'year', 'extraInformation'])}
              >
                Add Achievement
              </button>
            </div>
          ) : (
            <h3>Achievements</h3>
          )}

          <div className="achievement-list">
            {resumeData.achievements.map((item, idx) => (
              <div key={idx} className="section-item achievement-item">
                <div className="achievement-grid">
                  <div className="form-group">
                    <label className="resume-form-label">Title</label>
                    <input
                      className="resume-form-input compact"
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => handleChange('achievements', 'title', e.target.value, idx)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="resume-form-label">Year</label>
                    <input
                      className="resume-form-input compact"
                      type="text"
                      value={item.year || ''}
                      onChange={(e) => handleChange('achievements', 'year', e.target.value, idx)}
                    />
                  </div>
                </div>

                <div className="achievement-details">
                  <div className="form-group">
                    <label className="resume-form-label">Details</label>
                    <textarea
                      className="resume-form-textarea compact"
                      rows={2}
                      value={item.extraInformation || ''}
                      onChange={(e) => handleChange('achievements', 'extraInformation', e.target.value, idx)}
                      placeholder="Brief details about the achievement"
                    />
                  </div>
                </div>

                <div className="achievement-actions-row">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => handleRemoveItem('achievements', idx)}
                  >
                    Remove
                  </button>

                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => handleAddItem('achievements', ['title', 'year', 'extraInformation'])}
                  >
                    Add Achievement
                  </button>
                </div>
              </div>
            ))}
            
          </div>
        </div>
        {renderArraySection('Certifications', 'certifications', ['title', 'issuingOrganization', 'year'])}
        {renderArraySection('Education', 'education', ['degree', 'university', 'location', 'graduationYear'])}
        {renderArraySection('Experience', 'experience', ['jobTitle', 'company', 'location', 'duration', 'responsibility'])}
        {renderArraySection('Projects', 'projects', ['title', 'description', 'technologiesUsed', 'githubLink'])}
        {renderArraySection('Skills', 'skills', ['title', 'level'])}
        {renderArraySection('Interests', 'interests', ['name'])}
        {renderArraySection('Languages', 'languages', ['name'])}

        <button className="btn-primary" onClick={handleSubmit}>
          Generate PDF Resume
        </button>
      </div>
    </div>
  );
}
