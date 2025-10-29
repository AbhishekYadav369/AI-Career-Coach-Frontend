/**
 * NetworkingTips Component
 * Networking advice and best practices
 */
import React from 'react';
import '../../styles/components/connection.css';

export default function NetworkingTips() {
  const tips = [
    "Personalize your connection messages",
    "Engage with their content before connecting",
    "Attend industry events and webinars",
    "Follow up after initial connections",
    "Offer value before asking for help",
    "Maintain regular contact with your network"
  ];

  return (
    <div className="networking-tips">
      <h3>Networking Tips</h3>

      <ul className="tips-list">
        {tips.map((tip, index) => (
          <li key={index} className="tip-item">
            <span className="tip-icon">💡</span>
            <span className="tip-text">{tip}</span>
          </li>
        ))}
      </ul>

      <div className="tip-highlight">
        <h4>Pro Tip</h4>
        <p>
          Quality over quantity! It's better to have 50 meaningful connections 
          than 500 random ones.
        </p>
      </div>
    </div>
  );
}