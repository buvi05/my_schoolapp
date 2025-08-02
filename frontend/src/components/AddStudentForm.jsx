import React, { useState } from "react";

const AddStudentForm = ({ onStudentAdded, teachers, parents }) => {
  const [formData, setFormData] = useState({
    name: "",
    year_level: "",
    age: "",
    gender: "Male",
    ethnicity: "",
    phone: "",
    address: "",
    height: "",
    teacher_id: teachers.length > 0 ? teachers[0].id : "",
    parent_id: parents.length > 0 ? parents[0].id : "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate required fields
    if (!formData.name || !formData.year_level || !formData.age || !formData.teacher_id || !formData.parent_id) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://YOUR_BACKEND_IP:5000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_JWT_TOKEN",
        },
        body: JSON.stringify({
          ...formData,
          year_level: Number(formData.year_level),
          age: Number(formData.age),
          height: formData.height ? Number(formData.height) : null,
          teacher_id: Number(formData.teacher_id),
          parent_id: Number(formData.parent_id),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add student");
      }

      const data = await res.json();
      onStudentAdded(data.student);
      setFormData({
        name: "",
        year_level: "",
        age: "",
        gender: "Male",
        ethnicity: "",
        phone: "",
        address: "",
        height: "",
        teacher_id: teachers.length > 0 ? teachers[0].id : "",
        parent_id: parents.length > 0 ? parents[0].id : "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-2">Add New Student</h3>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <div className="mb-2">
        <label className="block">Name*:</label>
        <input name="name" value={formData.name} onChange={handleChange} className="border rounded p-1 w-full" />
      </div>
      <div className="mb-2">
        <label className="block">Year Level*:</label>
        <input
          name="year_level"
          type="number"
          value={formData.year_level}
          onChange={handleChange}
          className="border rounded p-1 w-full"
          min={1}
          max={13}
        />
      </div>
      <div className="mb-2">
        <label className="block">Age*:</label>
        <input name="age" type="number" value={formData.age} onChange={handleChange} className="border rounded p-1 w-full" />
      </div>
      <div className="mb-2">
        <label className="block">Gender*:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} className="border rounded p-1 w-full">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      {/* Optional fields */}
      <div className="mb-2">
        <label className="block">Ethnicity:</label>
        <input name="ethnicity" value={formData.ethnicity} onChange={handleChange} className="border rounded p-1 w-full" />
      </div>
      <div className="mb-2">
        <label className="block">Phone:</label>
        <input name="phone" value={formData.phone} onChange={handleChange} className="border rounded p-1 w-full" />
      </div>
      <div className="mb-2">
        <label className="block">Address:</label>
        <input name="address" value={formData.address} onChange={handleChange} className="border rounded p-1 w-full" />
      </div>
      <div className="mb-2">
        <label className="block">Height (cm):</label>
        <input name="height" type="number" value={formData.height} onChange={handleChange} className="border rounded p-1 w-full" />
      </div>
      <div className="mb-2">
        <label className="block">Teacher*:</label>
        <select name="teacher_id" value={formData.teacher_id} onChange={handleChange} className="border rounded p-1 w-full">
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.username}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block">Parent*:</label>
        <select name="parent_id" value={formData.parent_id} onChange={handleChange} className="border rounded p-1 w-full">
          {parents.map((p) => (
            <option key={p.id} value={p.id}>
              {p.username}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Adding..." : "Add Student"}
      </button>
    </form>
  );
};

export default AddStudentForm;