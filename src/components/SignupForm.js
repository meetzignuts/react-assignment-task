import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { storeUser, getUserByEmail } from '../services/Signup';
import { SnackBarMessage } from './SnackbarMessage';
import bcrypt from 'bcryptjs';
import { message } from '../utils/messages';
import {SignupSchema} from '../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';

const SignupForm = () => {
    const { control, handleSubmit, formState: { errors, isDirty, isValid }, reset } = useForm({
        mode: 'onChange',
        resolver: yupResolver(SignupSchema)
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        setError('');
        if(getUserByEmail(data.email)){
            setError(message.AUTH.SIGNUP.ALREADY_EXISTS);
            return;
        }
        data.password = await bcrypt.hash(data.password, 10);
        storeUser(data);
        setSuccessMessage(message.AUTH.SIGNUP.SUCCESS); // Set success message for the snackbar
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
              <TextField {...field} label="First Name" fullWidth margin="normal" error={!!errors.firstName} helperText={errors.firstName &&  message.FORM_VALIDATIONS.FIRST_NAME.REQUIRED} />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Last Name" fullWidth margin="normal" error={!!errors.lastName} helperText={errors.lastName &&  message.FORM_VALIDATIONS.LAST_NAME.REQUIRED} />
            )}
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
          />
        </Grid>
        <Grid item xs={12}>
        <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Password" type="password" fullWidth margin="normal" error={!!errors.password} helperText={errors.password && message.FORM_VALIDATIONS.PASSWORD.LENGTH} />
            )}
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