/**
 * ResumeTemplate Component
 * Template selection card
 */
import React from 'react';
import '../../styles/components/resume.css';

export default function ResumeTemplate({ template, isSelected, onSelect }) {

  const handleSelect = () => {
    onSelect(template);
  };

  return (
    <div
      className={`template-card ${isSelected ? 'selected' : ''}`}
      onClick={handleSelect}
    >
      <div className="template-preview">
        <div className="template-mock">
          {template.name}
        </div>
      </div>

      <div className="template-info">
        <h4>{template.name}</h4>
        <p>{template.description}</p>
      </div>
    </div>
  );
}