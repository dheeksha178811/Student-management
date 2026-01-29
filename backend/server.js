const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI)
.then(() => console.log("✅ MongoDB Atlas Connected"))
.catch(err => console.log("❌ Connection Error:", err));

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  age: Number,
  department: String,
  gender: String,
  email: String,
  phone: String,
  address: String,
  skills: String,
  yearOfStudy: String
});

const Student = mongoose.model("Student", studentSchema);


// CREATE student
app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (error) {
    console.error("Error saving student:", error);
    res.status(500).json({ message: "Error saving student", error: error.message });
  }
});

// READ all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
});

// UPDATE
app.put("/students/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student", error: error.message });
  }
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student", error: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
