/**
 * SkillChart Component
 * Visual representation of skill gaps
 */
import React from 'react';
import '../../styles/components/gap.css';

export default function SkillChart({ skills }) {
  return (
    <div className="skill-chart">
      <h3>Current vs Required Skills</h3>

      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-header">
              <span className="skill-name">{skill.skill}</span>
              <span className="skill-priority priority-{skill.priority.toLowerCase()}">
                {skill.priority}
              </span>
            </div>

            <div className="skill-bars">
              <div className="skill-bar current">
                <span className="bar-label">Current: {skill.current}/10</span>
                <div className="bar-fill" style={{ width: `${skill.current * 10}%` }}></div>
              </div>

              <div className="skill-bar required">
                <span className="bar-label">Required: {skill.required}/10</span>
                <div className="bar-fill" style={{ width: `${skill.required * 10}%` }}></div>
              </div>
            </div>

            <div className="skill-gap">
              Gap: {skill.required - skill.current} points
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}