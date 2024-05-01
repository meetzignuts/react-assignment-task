import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { LOCALSTORAGE_KEYS } from '../utils/constants';


export default function ButtonAppBar() {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem(LOCALSTORAGE_KEYS.LOGGEDIN_USER);
    navigate("/login");
  };
  const homeNavigation = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  const accountNavigation = (e) => {
    e.preventDefault();
    navigate("/account");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" onClick={homeNavigation} component="div" sx={{ flexGrow: 1 }} style={{cursor: 'pointer'}}>
            E-Commerce
          </Typography>
          <Button color="inherit" onClick={accountNavigation}>Account</Button>
          <Button color="inherit" onClick={logout}><LogoutIcon /></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}