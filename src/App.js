import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './components/common/Header';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/DashboardLayout';
import AccountInfoPage from './pages/AccountInfoPage';
import TuitionPage from './pages/TuitionPage';
import HistoryPage from './pages/HistoryPage';
import theme from './theme/theme';
import Typography from '@mui/material/Typography';

/**
 * @name MainApp
 * @description Main component that manages global state (user) and navigation.
 */
const MainApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setCurrentUser(user);
    navigate('/dashboard/tuition'); // Navigate to the tuition page after login
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
          path="/dashboard"
          element={currentUser ? <DashboardLayout user={currentUser} /> : <LoginPage onLogin={handleLogin} />}
        >
          {/* Nested routes for the dashboard */}
          <Route path="account" element={<AccountInfoPage user={currentUser} />} />
          <Route path="tuition" element={<TuitionPage user={currentUser} />} />
          <Route path="history" element={<HistoryPage user={currentUser} />} />
        </Route>
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
