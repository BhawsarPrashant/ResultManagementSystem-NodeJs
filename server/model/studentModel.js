// models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  rollNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("student", studentSchema);
export default User;
