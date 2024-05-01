import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { getUserById, changePassword } from '../services/User';
import { SnackBarMessage } from './SnackbarMessage';
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
import { message } from '../utils/messages';
import { LOCALSTORAGE_KEYS } from '../utils/constants';
import {ChangePasswordSchema} from '../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginForm = () => {

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { control, handleSubmit, formState: { errors, isDirty, isValid }, reset } = useForm({
        mode: 'onChange',
        resolver: yupResolver(ChangePasswordSchema)
    });

    const onSubmit = async (data) => {
        setError('');
        let result = await getUserById(localStorage.getItem(LOCALSTORAGE_KEYS.LOGGEDIN_USER));
        if(!result) {
          localStorage.removeItem(LOCALSTORAGE_KEYS.LOGGEDIN_USER);
          navigate("/login");
        }
        const response = await bcrypt.compare(data.currentpassword, result.user["password"]);
        if(response){
          data.newPassword = await bcrypt.hash(data.newPassword, 10);
          const res = changePassword(result.index, data.newPassword);
          if(!res){
            localStorage.removeItem(LOCALSTORAGE_KEYS.LOGGEDIN_USER);
            navigate("/login");
          }else{
            setSuccessMessage(message.AUTH.CHANGE_PASSWORD.SUCCESS);
            setOpenSnackbar(true);
            reset();
          }
        }else{
          setError(message.AUTH.CHANGE_PASSWORD.CURRENT_PASSWORD_INVALID);
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
              <TextField {...field} label="Password" type="password" fullWidth margin="normal" error={!!errors.currentpassword} helperText={errors.currentpassword && message.FORM_VALIDATIONS.CURRENT_PASSWORD.LENGTH} />
            )}
          />
          </Grid>
          <Grid item xs={12}>
        <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="New Password" type="password" fullWidth margin="normal" error={!!errors.newPassword} helperText={errors.newPassword && message.FORM_VALIDATIONS.NEW_PASSWORD.LENGTH} />
            )}
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