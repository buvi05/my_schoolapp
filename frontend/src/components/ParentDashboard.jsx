import React from "react";

const badgeStyle = {
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "0.8rem",
  fontWeight: "600",
  color: "white",
  marginRight: "8px",
  marginBottom: "6px",
};

const ParentDashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      {/* Title Tile */}
      <h1 className="text-3xl font-bold mb-6 border-b pb-3">Parent Dashboard</h1>

      {/* Student Info */}
      <div className="mb-6 space-y-1">
        <p>
          <strong>Student Name:</strong> Sai Deeshna
        </p>
        <p>
          <strong>Class:</strong> Year 2
        </p>
        <p>
          <strong>Activity Info:</strong> Weekly Summary
        </p>
      </div>

      {/* Weekly Report Table */}
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Week</th>
            <th className="border px-4 py-2 text-left">Games Played</th>
            <th className="border px-4 py-2 text-left">Calories Burnt</th>
            <th className="border px-4 py-2 text-left">Fitness Badges</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Week 1</td>
            <td className="border px-4 py-2">3</td>
            <td className="border px-4 py-2">450</td>
            <td className="border px-4 py-2">
              <span style={{ ...badgeStyle, backgroundColor: "#22c55e" /* green */ }}>
                Fitness Achieved
              </span>
              <span style={{ ...badgeStyle, backgroundColor: "#3b82f6" /* blue */ }}>
                Yellin Fitness
              </span>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>

      {/* Qualities Box */}
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-3">Qualities</h2>
        <div>
          <span style={{ ...badgeStyle, backgroundColor: "#22c55e" }}>
            Excels in Self Motivation
          </span>
          <span style={{ ...badgeStyle, backgroundColor: "#3b82f6" }}>
            Developing Leadership
          </span>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
