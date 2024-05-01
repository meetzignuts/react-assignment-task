import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';


const Signup = () => {
    
    return (
      <Container maxWidth="sm">
        <Grid container justifycontent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item>
            <Paper elevation={3} style={{ padding: '20px', minWidth: '300px' }}>
              <Typography variant="h5" gutterBottom align="center">
                Sign Up
              </Typography>
              <SignupForm />
              <p className='text-center mt-3'>Already have an account? <Link to="/" className='text-decoration-none'>Login</Link></p>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  };

export default Signup;