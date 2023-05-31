import React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import LiveBackground from './LiveBackground';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const AdminButton = styled(Button)(({ theme }) => ({
    borderRadius: '50px',
    margin: theme.spacing(2),
    padding: theme.spacing(2, 4),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.1)',
    },
}));

const UserButton = styled(Button)(({ theme }) => ({
    borderRadius: '50px',
    margin: theme.spacing(2),
    padding: theme.spacing(2, 4),
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.1)',
    },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
}));

const QuizApp = () => {
    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <LiveBackground />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <Paper elevation={24} style={{ padding: '2rem', borderRadius: '20px', display: 'inline-block' }}>
                    <TitleTypography variant="h4" component="div" gutterBottom>
                        Quiz Web App
                    </TitleTypography>
                    <Link to="/admin">
                        <AdminButton>Admin</AdminButton>
                    </Link>
                    <Link to="/user">
                        <UserButton variant="contained">User</UserButton>
                    </Link>
                </Paper>
            </div>
        </div>
    );
};

export default QuizApp;
