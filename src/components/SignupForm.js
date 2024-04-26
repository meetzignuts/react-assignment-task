import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { storeUser, getUserByEmail } from '../services/Signup';
import { SnackBarMessage } from './SnackbarMessage';
import bcrypt from 'bcryptjs';

const SignupForm = () => {
    const { control, handleSubmit, formState: { errors, isDirty, isValid }, watch, reset } = useForm({
        mode: 'onChange'
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [error, setError] = useState('');
    
    
    const password = watch("password");

    const onSubmit = async (data) => {
        setError('');
        if(getUserByEmail(data.email)){
            setError('User already exists');
            return;
        }
        data.password = await bcrypt.hash(data.password, 10);
        storeUser(data);
        setSuccessMessage('Signup successful!'); // Set success message for the snackbar
        setOpenSnackbar(true); // Show the snackbar
        reset();
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Close the snackbar
      };
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="First Name" fullWidth margin="normal" error={!!errors.firstName} helperText={errors.firstName && "First name is required"} />
            )}
            rules={{ required: 'First name is required' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Last Name" fullWidth margin="normal" error={!!errors.lastName} helperText={errors.lastName && "Last name is required"} />
            )}
            rules={{ required: 'Last name is required' }}
          />
        </Grid>
        <Grid item xs={12}>
            <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Email" fullWidth margin="normal" type="email" error={!!errors.email} helperText={errors.email && errors.email.message} />
            )}
            rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="mobileNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Mobile Number" fullWidth margin="normal" error={!!errors.mobileNumber} helperText={errors.mobileNumber && errors.mobileNumber.message} />
            )}
            rules={{ required: 'Mobile number is required' }}
          />
        </Grid>
        <Grid item xs={12}>
        <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Password" type="password" fullWidth margin="normal" error={!!errors.password} helperText={errors.password && "Password is required and must be at least 8 characters long"} />
            )}
            rules={{ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } }}
          />
        </Grid>
        <Grid item xs={12}>
        <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Confirm Password" type="password" fullWidth margin="normal" error={!!errors.confirmPassword} helperText={errors.confirmPassword && errors.confirmPassword.message} />
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
          <Button variant="contained" color="primary" type="submit" fullWidth disabled={!isDirty || !isValid}>
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
        <SnackBarMessage time={6000} message={successMessage} openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar}/>
    </div>
    
  );
};

export default SignupForm;