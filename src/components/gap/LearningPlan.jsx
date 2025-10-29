/**
 * LearningPlan Component
 * Personalized learning recommendations
 */
import React from 'react';
import '../../styles/components/gap.css';

export default function LearningPlan({ career, skillGaps }) {

  const generateRecommendations = () => {
    return [
      {
        skill: 'Programming',
        resources: ['Online coding bootcamp', 'Practice projects', 'Open source contribution'],
        timeline: '3-6 months',
        priority: 'High'
      },
      {
        skill: 'Database Management',
        resources: ['SQL courses', 'Database design projects', 'Certification programs'],
        timeline: '2-4 months',
        priority: 'Medium'
      }
    ];
  };

  const recommendations = generateRecommendations();

  return (
    <div className="learning-plan">
      <h3>Personalized Learning Plan</h3>

      <div className="plan-overview">
        <p>Based on your selected career path: <strong>{career.title}</strong></p>
        <p>We recommend focusing on the following areas:</p>
      </div>

      <div className="recommendations-list">
        {recommendations.map((rec, index) => (
          <div key={index} className="recommendation-item">
            <div className="rec-header">
              <h4>{rec.skill}</h4>
              <span className={`priority priority-${rec.priority.toLowerCase()}`}>
                {rec.priority} Priority
              </span>
            </div>

            <div className="rec-timeline">
              <strong>Estimated Timeline:</strong> {rec.timeline}
            </div>

            <div className="rec-resources">
              <strong>Recommended Resources:</strong>
              <ul>
                {rec.resources.map((resource, i) => (
                  <li key={i}>{resource}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}