/**
 * ConnectionCard Component
 * Individual professional connection card
 */
import React from 'react';
import '../../styles/components/connection.css';
export default function ConnectionCard({ connection }) {

  const handleConnect = () => {
    // Mock LinkedIn connection
    alert(`Connection request sent to ${connection.name}!`);
  };

  return (
    <div className="connection-card">
      <div className="connection-avatar">
        <div className="avatar-placeholder">
          {connection.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>

      <div className="connection-info">
        <h3 className="connection-name">{connection.name}</h3>
        <p className="connection-title">{connection.title}</p>
        <p className="connection-company">{connection.company}</p>
        <p className="connection-location">{connection.location}</p>

        <div className="connection-stats">
          <span className="mutual-connections">
            {connection.mutualConnections} mutual connections
          </span>
          <span className={`relevance relevance-${connection.relevance.toLowerCase()}`}>
            {connection.relevance} relevance
          </span>
        </div>
      </div>

      <div className="connection-actions">
        <button className="btn-primary" onClick={handleConnect}>
          Connect
        </button>
        <a
          href={connection.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}