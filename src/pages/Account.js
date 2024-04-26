import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Typography, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ChangePasswordForm from '../components/ChangePasswordForm';
import ProfileForm from '../components/ProfileForm';


const Account = () => {
    const navigate = useNavigate();
    const handleClick = (event) => {
        event.preventDefault();
        navigate("/home");
    }

    return (
        <div className='w-100'>
            <Navbar />
            <Container maxWidth="xl" className='mt-4'>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" onClick={handleClick} style={{ cursor: 'pointer' }}>
                            Home
                        </Link>
                        <Typography color="text.primary">Account</Typography>
                    </Breadcrumbs>
                </div>
                <Grid container spacing={2} className='mt-5'>
                    <Grid item xs={12} md={6} sm={6}>
                        <Paper elevation={3} style={{ padding: '20px', minWidth: '300px' }}>
                            <Typography variant="h5" gutterBottom align="center">
                                Profile
                            </Typography>
                            <ProfileForm />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                        <Paper elevation={3} style={{ padding: '20px', minWidth: '300px' }}>
                            <Typography variant="h5" gutterBottom align="center">
                                Change Password
                            </Typography>
                            <ChangePasswordForm />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Account;