import React, {useEffect} from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("userLoggedIn")){
            navigate("/home");
        }
    },[]);
    return (
      <Container maxWidth="sm">
        <Grid container justifycontent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item>
            <Paper elevation={3} style={{ padding: '20px', minWidth: '300px' }}>
              <Typography variant="h5" gutterBottom align="center">
                Login
              </Typography>
              <LoginForm />
              <p className='text-center mt-3'>Don't have an account? <Link to="/signup" className='text-decoration-none'>Signup</Link></p>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  };

export default Login;