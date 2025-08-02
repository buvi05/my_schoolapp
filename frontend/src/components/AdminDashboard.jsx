import React, { useState, useEffect } from "react";
import axios from "axios";

const backendBase = "http://16.176.172.125:5000";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", year: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students from backend on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendBase}/common/students/`);
      // Adjust if your backend returns differently
      setStudents(response.data.students || response.data || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to load students.");
      setLoading(false);
    }
  };

  const handleAddStudent = async () => {
    if (!newStudent.name.trim()) {
      alert("Please enter a student name.");
      return;
    }
    try {
      await axios.post(`${backendBase}/common/students/`, {
        name: newStudent.name,
        year: selectedYear,
      });
      setNewStudent({ name: "", year: "" });
      setShowForm(false);
      fetchStudents();
    } catch (err) {
      alert("Error adding student");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`${backendBase}/common/students/${id}`);
      fetchStudents();
    } catch (err) {
      alert("Error deleting student");
    }
  };

  // Group students by year
  const groupedStudents = students.reduce((acc, student) => {
    const year = student.year || "Unknown";
    if (!acc[year]) acc[year] = [];
    acc[year].push(student);
    return acc;
  }, {});

  if (loading) return <div className="p-6 text-center">Loading students...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Admin Dashboard
      </h1>

      {/* Year buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.keys(groupedStudents).map((year) => (
          <button
            key={year}
            onClick={() => {
              setSelectedYear(year);
              setShowForm(false); // Hide form when switching years
            }}
            className={`px-6 py-2 rounded-lg font-semibold shadow transition ${
              selectedYear === year
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-100"
            }`}
          >
            Year {year}
          </button>
        ))}
      </div>

      {/* Student list + Add form for selected year */}
      {selectedYear && (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Students in Year {selectedYear}
          </h2>

          {groupedStudents[selectedYear].length === 0 ? (
            <p className="text-center text-gray-500 mb-4">No students found.</p>
          ) : (
            <ul className="space-y-3 mb-6">
              {groupedStudents[selectedYear].map((student) => (
                <li
                  key={student.id}
                  className="flex justify-between items-center bg-gray-50 rounded p-3 shadow-sm"
                >
                  <span>{student.name}</span>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Add Student Form toggle */}
          {showForm ? (
            <div className="bg-gray-50 p-4 rounded">
              <input
                type="text"
                placeholder="Student Name"
                className="w-full p-2 border border-gray-300 rounded mb-3"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
                autoFocus
              />
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStudent}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Add Student
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add Student
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;