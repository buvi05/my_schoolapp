// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import ParentDashboard from './components/ParentDashboard';

// Import sample dashboards
//mport SampleAdmin from './sampledash/sampleadmin';
//port SampleStudent from './sampledash/samplestudent';
//import SampleParent from './sampledash/sampleparent';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Real Dashboards */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/parent" element={<ParentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
