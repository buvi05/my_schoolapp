import React, { useEffect, useState } from "react";
import axios from "axios";

const backendBase = "http://16.176.172.125:5000";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [traits, setTraits] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [filterDate, setFilterDate] = useState("");  // For filtering sessions by date

  const [formData, setFormData] = useState({
    studentId: "",
    activityId: "",
    eqTraitId: "",
    duration: "",
    date: "",
  });

  const token = localStorage.getItem("access_token");

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${backendBase}/common/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${backendBase}/meta/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(res.data);
    } catch (err) {
      console.error("Error fetching activities:", err);
    }
  };

  const fetchTraits = async () => {
    try {
      const res = await axios.get(`${backendBase}/common/eq_traits`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTraits(res.data);
    } catch (err) {
      console.error("Error fetching traits:", err);
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await axios.get(`${backendBase}/sessions/sessions/teacher`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(res.data);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStudents();
      fetchActivities();
      fetchTraits();
      fetchSessions();
    } else {
      console.warn("No access token found. Please login.");
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // For filtering date input change
  const handleFilterDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${backendBase}/sessions/`,
        {
          student_id: formData.studentId,
          activity_id: formData.activityId,
          eq_trait_id: formData.eqTraitId || null,
          duration: parseInt(formData.duration),
          date: formData.date,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Session created!");
      setFormData({
        studentId: "",
        activityId: "",
        eqTraitId: "",
        duration: "",
        date: "",
      });
      fetchSessions();
    } catch (err) {
      console.error("Error submitting session:", err);
      alert("Failed to create session. See console.");
    }
  };

  // Filter sessions by date if filterDate is set
  const filteredSessions = filterDate
    ? sessions.filter((session) => session.date === filterDate)
    : sessions;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {/* Student Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Student:</label>
          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {/* Activity Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Activity:</label>
          <select
            name="activityId"
            value={formData.activityId}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          >
            <option value="">Select an activity</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </div>

        {/* EQ Trait Dropdown (Optional) */}
        <div>
          <label className="block mb-1 font-medium">EQ Trait (optional):</label>
          <select
            name="eqTraitId"
            value={formData.eqTraitId}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          >
            <option value="">None</option>
            {traits.map((trait) => (
              <option key={trait.id} value={trait.id}>
                {trait.name}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 font-medium">Duration (in minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Session
        </button>
      </form>

      {/* Filter sessions by date */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Filter Sessions by Date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={handleFilterDateChange}
          className="w-full border px-3 py-2"
        />
      </div>

      {/* Sessions Table */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Submitted Sessions</h3>
        {filteredSessions.length === 0 ? (
          <p>No sessions recorded for this date.</p>
        ) : (
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Student</th>
                <th className="px-4 py-2 border">Activity</th>
                <th className="px-4 py-2 border">Trait</th>
                <th className="px-4 py-2 border">Duration</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session) => (
                <tr key={session.id}>
                  <td className="px-4 py-2 border">{session.student_name}</td>
                  <td className="px-4 py-2 border">{session.activity_name}</td>
                  <td className="px-4 py-2 border">
                    {session.eq_trait_name || "—"}
                  </td>
                  <td className="px-4 py-2 border">{session.duration} min</td>
                  <td className="px-4 py-2 border">{session.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
