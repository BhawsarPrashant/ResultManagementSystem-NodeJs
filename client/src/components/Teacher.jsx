import React from "react";
import { useState, useEffect } from "react";
import { Container, Typography, Snackbar, Button, Link } from "@mui/material";
import { Alert } from "@mui/material";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import { useNavigate } from "react-router-dom";
const Teacher = ({ students, setStudents }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const addStudent = async (student) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (response.status === 400) {
        showError("Student with same Roll number already existed");
        return;
      }
      const data = await response.json();
      console.log(data);
      setStudents([...students, data]);
    } catch (error) {
      console.error("Error adding student:", error);
      showError("Failed to add student. Please try again.");
    }
  };

  const updateStudent = async (id, updatedStudent) => {
    console.log(id, updatedStudent);
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudent),
        }
      );
      const data = await response.json();
      const updatedStudents = students.map((student) =>
        student._id === id ? data : student
      );
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error updating student:", error);
      showError("Failed to update student. Please try again.");
    }
  };

  const deleteStudent = async (id) => {
    console.log(id);
    try {
      await fetch(`http://localhost:5000/api/user/delete/${id}`, {
        method: "DELETE",
      });
      const updatedStudents = students.filter((student) => student._id !== id);
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
      showError("Failed to delete student. Please try again.");
    }
  };

  const showError = (message) => {
    setError(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <>
      <Button
        style={{ backgroundColor: "grey", height: "20px", margin: "10px" }}
        variant="contained"
        onClick={() => navigate("/")}
      >
        Back
      </Button>

      <Container>
        <StudentForm addStudent={addStudent} showError={showError} />
        <StudentList
          students={students}
          updateStudent={updateStudent}
          deleteStudent={deleteStudent}
          showError={showError}
        />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Teacher;
