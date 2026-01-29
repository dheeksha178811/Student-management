import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = process.env.API_URL || "http://localhost:5000";

function App() {
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    age: "",
    department: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    skills: "",
    yearOfStudy: ""
  });

  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get(`${API}/students`);
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/students`, form);
    fetchStudents();
    setForm({
      name: "",
      rollNo: "",
      age: "",
      department: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      skills: "",
      yearOfStudy: ""
    });
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API}/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="container">
    <h1 className="title">Student Management System</h1>

    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key}
              value={form[key]}
              onChange={handleChange}
              required
            />
          ))}
        </div>
        <button className="btn" type="submit">Add Student</button>
      </form>
    </div>

    <h2 className="records-title">Student Records</h2>

    <div className="student-grid">
      {students.map((s) => (
        <div key={s._id} className="student-card">
          <p><b>Name:</b> {s.name}</p>
          <p><b>Roll No:</b> {s.rollNo}</p>
          <p><b>Age:</b> {s.age}</p>
          <p><b>Department:</b> {s.department}</p>
          <p><b>Gender:</b> {s.gender}</p>
          <p><b>Email:</b> {s.email}</p>
          <p><b>Phone:</b> {s.phone}</p>
          <p><b>Address:</b> {s.address}</p>
          <p><b>Skills:</b> {s.skills}</p>
          <p><b>Year:</b> {s.yearOfStudy}</p>
          <button className="delete-btn" onClick={() => deleteStudent(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
  );
}

export default App;
