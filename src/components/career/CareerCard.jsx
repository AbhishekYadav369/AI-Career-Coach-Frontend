/**
 * CareerCard Component
 * Individual career option card with API call on selection
 */
import React from 'react';
import axios from 'axios';
import '../../styles/components/career.css';
import { useNavigate } from 'react-router-dom';

export default function CareerCard({ career, onSelect }) {
  const navigate=useNavigate();
  const handleSelect = async () => {
    try {
      // Optional: Notify parent before API call
      onSelect?.(career);

      const feedback = career.title; // e.g. "Data Science"
      const token = sessionStorage.getItem('token'); // if you store JWT
      const userid = sessionStorage.getItem('userid'); // if you store JWT
      const userId = userid; // can be dynamic

      const response = await axios.post(
        `http://localhost:8080/career/paths?userId=${userId}&feedback=${feedback}`,{},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Career Path Data:", response.data);

      // You can call parent callback with new data
      onSelect?.(response.data);
navigate('/gap');

    } catch (error) {
      console.error("Error fetching career path:", error);
      alert("Failed to load career path details. Try again later.");
    }
  };

  return (
    <div className="career-card">
      <div className="career-card-header">
        <h3 className="career-title">{career.title}</h3>
        <div className="match-percentage">
          <span className="match-score">{career.matchPercentage}%</span>
          <span className="match-label">Match</span>
        </div>
      </div>

      <div className="career-card-body">
        <p className="career-description">{career.description}</p>

        <div className="career-details">
          <div className="detail-item">
            <span className="detail-label">Salary Range:</span>
            <span className="detail-value">{career.salaryRange}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Growth Prospect:</span>
            <span className="detail-value">{career.growthProspect}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Industry:</span>
            <span className="detail-value">{career.industry}</span>
          </div>
        </div>

        <div className="required-skills">
          <h4>Required Skills:</h4>
          <div className="skills-list">
            {career.requiredSkills?.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="career-card-footer">
        <button className="btn-primary" onClick={handleSelect}>
          Select This Career
        </button>
      </div>
    </div>
  );
}
