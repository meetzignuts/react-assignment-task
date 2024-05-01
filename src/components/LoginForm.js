import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Grid, Container } from '@mui/material';
import { login } from '../services/Login';
import { SnackBarMessage } from './SnackbarMessage';
import { useNavigate } from "react-router-dom";
import { message } from '../utils/messages';
import { LOCALSTORAGE_KEYS } from '../utils/constants';
import {LoginSchema} from '../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginForm = () => {

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { control, handleSubmit, formState: { errors, isDirty, isValid }, reset } = useForm({
        mode: 'onChange',
        resolver: yupResolver(LoginSchema)
    });

    const onSubmit = async (data) => {
        setError('');
        let response = await login(data);
        console.log(response);
        switch(response.message){
            case 'SUCCESS':
                setSuccessMessage(message.AUTH.LOGIN.SUCCESS); // Set success message for the snackbar
                setOpenSnackbar(true); // Show the snackbar
                localStorage.setItem(LOCALSTORAGE_KEYS.LOGGEDIN_USER,response.id);
                reset();
                setTimeout(() => {
                  navigate("/home");
                }, 100);
                break;
            case 'INVALID_CREDENTIALS':
                setError(message.AUTH.LOGIN.INVALID_CREDENTIALS);
                break;
            case 'NOT_EXIST':
                setError(message.AUTH.LOGIN.NOT_EXISTS);
                break;
        }
        
        console.log(data);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Close the snackbar
      };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} justifycontent="center">
          <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Email" fullWidth margin="normal" type="email" error={!!errors.email} helperText={errors.email && errors.email.message} />
            )}
          />
          </Grid>
          <Grid item xs={12}>
            <Controller
                name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Password" type="password" fullWidth margin="normal" error={!!errors.password} helperText={errors.password &&  message.FORM_VALIDATIONS.PASSWORD.LENGTH} />
            )}
          />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isDirty || !isValid}>
              Login
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
      <SnackBarMessage time={6000} message={successMessage} openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar}/>
    </Container>
  );
};

export default LoginForm;