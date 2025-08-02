import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 to-blue-500 px-4">
      <div className="flex items-center mb-8">
        {/* Different adult fitness icon */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/2913/2913468.png" // person lifting weights icon
          alt="Adult fitness"
          className="w-10 h-10 mr-3"
        />
        <h1 className="text-4xl font-extrabold text-blue-900 text-center">
          Physical Fitness & Emotional Intelligence Tracker
        </h1>
      </div>
      <button
        onClick={() => navigate('/login')}
        className="bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-800 transition-colors duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default LandingPage;
