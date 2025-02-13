import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome to the Document Classifier</h1>
      <div className="nav-links">
        <Link to="/input">Classify Text</Link>
      </div>
    </div>
  );
}

export default Dashboard;
