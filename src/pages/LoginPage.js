import React from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';
import LoginForm from '../components/user/LoginForm';

/**
 * @name LoginPage
 * @description Page component for the login screen.
 * @param {object} props - Component props.
 * @param {function} props.onLogin - Callback for a successful login.
 */
const LoginPage = ({ onLogin }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Đăng nhập vào Hệ thống iBanking
        </Typography>
        <LoginForm onLogin={onLogin} />
      </Paper>
    </Container>
  );
};

export default LoginPage;
