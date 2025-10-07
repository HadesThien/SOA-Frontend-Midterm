import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';


import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './components/common/Header';
import LoginPage from './pages/LoginPage';
import PaymentPage from './pages/PaymentPage';
import theme from './theme/theme';
import Typography from '@mui/material/Typography';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const MainApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setCurrentUser(user);
    navigate('/payment');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header onLogout={handleLogout} currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/payment"
          element={currentUser ? <PaymentPage user={currentUser} /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route path="*" element={<Box sx={{ p: 3, textAlign: 'center' }}><Typography variant="h4">404 - Trang không tồn tại</Typography></Box>} />
      </Routes>
    </Box>
  );
};

/**
 * @name App
 * @description Root component that provides routing and theme context.
 */
export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainApp />
      </ThemeProvider>
    </Router>
  );
}
