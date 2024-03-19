import React, { useState } from "react";
import {
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const StudentSearch = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formData, setFormData] = useState({
    rollNumber: "",
    dob: "",
  });

  const formateDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/fetchOne/${formData.rollNumber}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Student not found");
      }
      const data = await response.json();
      if (!data) {
        throw new Error("Student not found");
      }
      setData(data);
    } catch (error) {
      console.error("Error fetching student:", error.message);
      showError(error.message);
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
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Roll Number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Search Student
            </Button>
          </Grid>
        </Grid>
      </form>

      {data && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={data._id}>
                <TableCell>{data.rollNumber}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{formateDate(new Date(data.dob))}</TableCell>
                <TableCell>{data.score}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

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
    </>
  );
};

export default StudentSearch;
