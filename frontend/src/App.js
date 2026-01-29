import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// 🔗 Your Render backend URL
const API = "https://stu-backend-gfzl.onrender.com";

function App() {
  // Form State
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

  // Students List State
  const [students, setStudents] = useState([]);

  // 🟢 Fetch students when page loads
  useEffect(() => {
    axios.get(`${API}/students`)
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🟢 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🟢 Add student
  const addStudent = (e) => {
    e.preventDefault();

    axios.post(`${API}/students`, form)
      .then(res => {
        setStudents([...students, res.data]); // update UI
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
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      {/* FORM */}
      <form className="form" onSubmit={addStudent}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="rollNo" placeholder="Roll No" value={form.rollNo} onChange={handleChange} required />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
        <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="skills" placeholder="Skills" value={form.skills} onChange={handleChange} />
        <input name="yearOfStudy" placeholder="Year Of Study" value={form.yearOfStudy} onChange={handleChange} />

        <button type="submit">Add Student</button>
      </form>

      {/* STUDENT LIST */}
      <h2>Student Records</h2>
      <div className="student-list">
        {students.map((s) => (
          <div key={s._id} className="card">
            <h3>{s.name}</h3>
            <p><b>Roll No:</b> {s.rollNo}</p>
            <p><b>Age:</b> {s.age}</p>
            <p><b>Dept:</b> {s.department}</p>
            <p><b>Skills:</b> {s.skills}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
