/**
 * CareerFilter Component
 * Filtering controls for career options
 */
import React from 'react';
import '../../styles/components/career.css';

export default function CareerFilter({ filters, onFilterChange }) {

  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  return (
    <div className="career-filter">
      <h3>Filter Careers</h3>

      <div className="filter-group">
        <label className="filter-label">Industry</label>
        <select
          value={filters.industry}
          onChange={(e) => handleFilterChange('industry', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Industries</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Design">Design</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Salary Range</label>
        <select
          value={filters.salaryRange}
          onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Ranges</option>
          <option value="entry">Entry Level ($40k-60k)</option>
          <option value="mid">Mid Level ($60k-100k)</option>
          <option value="senior">Senior Level ($100k+)</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">
          Minimum Match: {filters.matchPercentage}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          value={filters.matchPercentage}
          onChange={(e) => handleFilterChange('matchPercentage', parseInt(e.target.value))}
          className="filter-slider"
        />
      </div>
    </div>
  );
}