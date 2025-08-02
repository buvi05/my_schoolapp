import React, { useEffect, useState } from "react";
import axios from "axios";

const AddSession = ({ studentId, backendBase }) => {
  const [activities, setActivities] = useState([]);
  const [eqTraits, setEqTraits] = useState([]);
  const [formData, setFormData] = useState({
    activity: "",
    eq_trait: "",
    duration: "",
    date: "",
  });

  useEffect(() => {
    axios.get(`${backendBase}/common/activities`).then((res) => setActivities(res.data));
    axios.get(`${backendBase}/meta/eq_traits`).then((res) => setEqTraits(res.data));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!formData.activity || !formData.eq_trait || !formData.duration || !formData.date) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .post(`${backendBase}/dashboard/teacher/sessions`, {
        student_id: studentId,
        ...formData,
      })
      .then(() => {
        alert("Session added!");
        setFormData({ activity: "", eq_trait: "", duration: "", date: "" });
      })
      .catch((err) => console.error("Error adding session:", err));
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Add Session</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select name="activity" value={formData.activity} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Activity</option>
          {activities.map((a, i) => (
            <option key={i} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select name="eq_trait" value={formData.eq_trait} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select EQ Trait</option>
          {eqTraits.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input
          name="duration"
          placeholder="Duration (min)"
          value={formData.duration}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <button onClick={handleSubmit} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Add Session
      </button>
    </div>
  );
};

export default AddSession;
