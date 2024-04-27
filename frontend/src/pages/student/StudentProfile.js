import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  Container,
  Paper,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <Container maxWidth="md">
      <StyledCard elevation={3}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                  {String(currentUser.name).charAt(0)}
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" component="h2" textAlign="center">
                  {currentUser.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="subtitle1"
                  component="p"
                  textAlign="center"
                >
                  Student Roll No: {currentUser.rollNum}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="subtitle1"
                  component="p"
                  textAlign="center"
                >
                  Class: {sclassName.sclassName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="subtitle1"
                  component="p"
                  textAlign="center"
                >
                  School: {studentSchool.schoolName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="subtitle1"
                  component="p"
                  textAlign="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/student/form"
                  >
                    Fill Personal Info
                  </Button>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
      <Paper elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Date of Birth:</strong> {currentUser.dateOfBirth}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Gender:</strong> {currentUser.gender}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Email:</strong> {currentUser.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Phone:</strong> {currentUser.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Address:</strong> {currentUser.address}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Emergency Contact:</strong>{" "}
                {currentUser.emergencyContact}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </Container>
  );
};

export default StudentProfile;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  background-color: white;
`;
