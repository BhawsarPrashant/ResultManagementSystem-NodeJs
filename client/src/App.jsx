// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Teacher from "./components/Teacher";
import Login from "./components/Login/Login";
import StudentSearch from "./components/StudentSearch/StudentSearch";

function App() {
  const [students, setStudents] = useState([]);
  const [ui, setUi] = useState(0);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/fetch");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      showError("Failed to fetch students. Please try again later.");
    }
  };
  return (
    <BrowserRouter>
      <Home />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student-login" element={<StudentSearch />} />
        <Route
          path="/teacher-login"
          element={<Teacher students={students} setStudents={setStudents} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
