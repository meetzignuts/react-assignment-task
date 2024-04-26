import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Grid, Container } from '@mui/material';
import { getUserById, changePassword } from '../services/User';
import { SnackBarMessage } from './SnackbarMessage';
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const LoginForm = () => {

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { control, handleSubmit, formState: { errors, isDirty, isValid }, reset, watch } = useForm({
        mode: 'onChange'
    });

    const password = watch("newPassword");

    const onSubmit = async (data) => {
        setError('');
        let result = await getUserById(localStorage.getItem('userLoggedIn'));
        if(!result) {
          localStorage.removeItem("userLoggedIn");
          navigate("/login");
        }
        const response = await bcrypt.compare(data.currentpassword, result.user["password"]);
        if(response){
          data.newPassword = await bcrypt.hash(data.newPassword, 10);
          const res = changePassword(result.index, data.newPassword);
          if(!res){
            localStorage.removeItem("userLoggedIn");
            navigate("/login");
          }else{
            setSuccessMessage('Password change successfully');
            setOpenSnackbar(true);
            reset();
          }
        }else{
          setError('Current password is invalid');
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Close the snackbar
      };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} justifycontent="center">
          <Grid item xs={12}>
            <Controller
                name="currentpassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Password" type="password" fullWidth margin="normal" error={!!errors.currentpassword} helperText={errors.currentpassword && "Current Password is required and must be at least 8 characters long"} />
            )}
            rules={{ required: 'Current Password is required' }}
          />
          </Grid>
          <Grid item xs={12}>
        <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="New Password" type="password" fullWidth margin="normal" error={!!errors.newPassword} helperText={errors.newPassword && "New Password is required and must be at least 8 characters long"} />
            )}
            rules={{ required: 'New Password is required', minLength: { value: 8, message: 'New Password must be at least 8 characters long' } }}
          />
        </Grid>
        <Grid item xs={12}>
        <Controller
            name="confirmNewPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Confirm Password" type="password" fullWidth margin="normal" error={!!errors.confirmNewPassword} helperText={errors.confirmNewPassword && errors.confirmNewPassword.message} />
            )}
            rules={{ 
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            }}
          />
        </Grid>
        {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isDirty || !isValid}>
              Change Password
            </Button>
          </Grid>
        </Grid>
      </form>
      <SnackBarMessage time={6000} message={successMessage} openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar}/>
    </div>
  );
};

export default LoginForm;