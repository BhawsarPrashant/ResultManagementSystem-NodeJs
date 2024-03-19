// StudentForm.js
import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

function StudentForm({ addStudent, showError }) {
  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    dob: "",
    score: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addStudent({ ...formData });
      setFormData({
        rollNumber: "",
        name: "",
        dob: "",
        score: "",
      });
    } else {
      showError("Please fill out all fields.");
    }
  };

  const validateForm = () => {
    return (
      formData.rollNumber !== "" &&
      formData.name !== "" &&
      formData.dob !== "" &&
      formData.score !== ""
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Roll Number"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Score"
            name="score"
            type="number"
            value={formData.score}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Student
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default StudentForm;
