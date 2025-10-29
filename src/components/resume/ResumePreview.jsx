/**
 * ResumePreview Component
 * Live preview of the resume
 */
import React from 'react';
import '../../styles/components/resume.css';

export default function ResumePreview({ template, data }) {

  return (
    <div className="resume-preview">
      <div className="preview-header">
        <h3>Preview: {template.name} Template</h3>
      </div>

      <div className="resume-document">
        <div className="resume-section">
          <h2>{data.personal?.fullName || 'Your Name'}</h2>
          <p>{data.personal?.email || 'your.email@example.com'}</p>
          <p>{data.personal?.phoneNumber || '+1 (555) 123-4567'}</p>
          <p>{data.personal?.location || 'City, State'}</p>
        </div>

        <div className="resume-section">
          <h3>Education</h3>
          <div className="education-item">
            <h4>{data.education?.degree || 'Your Degree'}</h4>
            <p>{data.education?.university || 'University Name'}</p>
            <p>{data.education?.graduationYear || 'Year'}</p>
          </div>
        </div>

        <div className="resume-section">
          <h3>Skills</h3>
          <p>Programming, Problem Solving, Communication, Teamwork</p>
        </div>

        <div className="resume-section">
          <h3>Languages</h3>
          <p>
            {data.languages?.native || 'Native Language'}
            {data.languages?.additional?.length > 0 && 
              `, ${data.languages.additional.join(', ')}`
            }
          </p>
        </div>
      </div>
    </div>
  );
}