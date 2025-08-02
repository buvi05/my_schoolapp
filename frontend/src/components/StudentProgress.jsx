import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentProgress = ({ studentId, backendBase }) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendBase}/dashboard/teacher/student_sessions/${studentId}`)
      .then((res) => setSessions(res.data))
      .catch((err) => console.error("Error fetching sessions:", err));
  }, [studentId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Student Progress</h2>
      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <table className="w-full table-auto border mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Activity</th>
              <th className="border px-4 py-2">EQ Trait</th>
              <th className="border px-4 py-2">Duration</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{s.activity}</td>
                <td className="border px-4 py-2">{s.eq_trait}</td>
                <td className="border px-4 py-2">{s.duration} min</td>
                <td className="border px-4 py-2">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentProgress;
