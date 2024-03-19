// Login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Import your CSS file for styling

const Login = ({ setUi }) => {
  const navigate = useNavigate();
  const handleTeacherLogin = () => {
    // Handle teacher login logic
    console.log("Teacher login clicked");
    navigate("/teacher-login");
  };

  const handleStudentLogin = () => {
    // Handle student login logic
    console.log("Student login clicked");
    navigate("/student-login");
  };

  return (
    <div className="login-container">
      <div className="button-container">
        <button className="teacher-login-btn" onClick={handleTeacherLogin}>
          Teacher Login
        </button>
        <button className="student-login-btn" onClick={handleStudentLogin}>
          Student Login
        </button>
      </div>
    </div>
  );
};

export default Login;
