/**
 * PerformanceTracker Component
 * Tracks interview practice performance
 */
import React from 'react';
import '../../styles/components/interview.css';

export default function PerformanceTracker({ performance }) {

  return (
    <div className="performance-tracker">
      <h3>Performance Stats</h3>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{performance.questionsAnswered}</div>
          <div className="stat-label">Questions Answered</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">{performance.averageTime}s</div>
          <div className="stat-label">Average Response Time</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">{Math.floor(performance.totalTime / 60)}m</div>
          <div className="stat-label">Total Practice Time</div>
        </div>
      </div>

      <div className="performance-tips">
        <h4>Tips to Improve</h4>
        <ul>
          <li>Practice the STAR method for behavioral questions</li>
          <li>Keep technical answers concise but complete</li>
          <li>Use specific examples from your experience</li>
          <li>Practice speaking clearly and confidently</li>
        </ul>
      </div>
    </div>
  );
}