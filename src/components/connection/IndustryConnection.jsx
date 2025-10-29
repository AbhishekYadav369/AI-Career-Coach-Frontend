/**
 * IndustryConnection Component
 * Professional networking and connections
 */
import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import ConnectionCard from './ConnectionCard';
import NetworkingTips from './NetworkingTips';
import { CONNECTIONS } from '../../data/dummyData';
import '../../styles/components/connection.css';

export default function IndustryConnection() {
  const [connections] = useState(CONNECTIONS);
  const [filter, setFilter] = useState('all');

  const filteredConnections = connections.filter(connection => {
    if (filter === 'all') return true;
    return connection.relevance.toLowerCase() === filter;
  });

  return (
    <div className="connection-container">
      <Navbar />

      <div className="connection-content">
        <div className="connection-header">
          <h1>Industry Connections</h1>
          <p>Connect with professionals in your field</p>
        </div>

        <div className="connection-layout">
          <div className="connection-sidebar">
            <div className="filter-section">
              <h3>Filter by Relevance</h3>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Connections</option>
                <option value="high">High Relevance</option>
                <option value="medium">Medium Relevance</option>
                <option value="low">Low Relevance</option>
              </select>
            </div>

            <NetworkingTips />
          </div>

          <div className="connection-main">
            <div className="connections-grid">
              {filteredConnections.map((connection) => (
                <ConnectionCard
                  key={connection.id}
                  connection={connection}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}