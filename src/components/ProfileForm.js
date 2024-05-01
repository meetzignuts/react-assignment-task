import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { SnackBarMessage } from './SnackbarMessage';
import { useNavigate } from "react-router-dom";
import { getUserById, checkEmailExist, updateUser } from '../services/User';
import { message } from '../utils/messages';
import { LOCALSTORAGE_KEYS } from '../utils/constants';
import {ProfileSchema} from '../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';

const ProfileForm = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(ProfileSchema)
    });

    

    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const res = getUserById(localStorage.getItem(LOCALSTORAGE_KEYS.LOGGEDIN_USER));
        if(!res) {
            localStorage.removeItem(LOCALSTORAGE_KEYS.LOGGEDIN_USER);
            navigate("/login");
        }

    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        setError('');
        let response = checkEmailExist(data.email, res.user.id);
        if(response){
            updateUser(res.index, {id: res.user.id, password: res.user.password, ...data});
            setSuccessMessage(message.AUTH.UPDATE_PROFILE.SUCCESS); // Set success message for the snackbar
            setOpenSnackbar(true); // Show the snackbar
        }else{
            setError(message.AUTH.UPDATE_PROFILE.ALREADY_EXISTS);
        }
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
            defaultValue={res ? res.user["firstName"] : ''}
            render={({ field }) => (
              <TextField {...field} label="First Name" fullWidth margin="normal" error={!!errors.firstName} helperText={errors.firstName && message.FORM_VALIDATIONS.FIRST_NAME.REQUIRED} />
            )}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controller
            name="lastName"
            control={control}
            defaultValue={res ? res.user["lastName"] : ''}
            render={({ field }) => (
              <TextField {...field} label="Last Name" fullWidth margin="normal" error={!!errors.lastName} helperText={errors.lastName && message.FORM_VALIDATIONS.LAST_NAME.REQUIRED} />
            )}
            
          />
        </Grid>
        <Grid item xs={12}>
            <Controller
            name="email"
            control={control}
            defaultValue={res ? res.user["email"] : ''}
            render={({ field }) => (
              <TextField {...field} label="Email" fullWidth margin="normal" type="email" error={!!errors.email} helperText={errors.email && errors.email.message} />
            )}
            
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="mobileNumber"
            control={control}
            defaultValue={res ? res.user["mobileNumber"] : ''}
            render={({ field }) => (
              <TextField {...field} label="Mobile Number" fullWidth margin="normal" error={!!errors.mobileNumber} helperText={errors.mobileNumber && errors.mobileNumber.message} />
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
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </form>
        <SnackBarMessage time={6000} message={successMessage} openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar}/>
    </div>
    
  );
};

export default ProfileForm;