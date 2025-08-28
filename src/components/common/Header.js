import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

/**
 * @name Header
 * @description Reusable header component for the application.
 * @param {object} props - Component props.
 * @param {function} props.onLogout - Callback function for logging out.
 * @param {object} props.currentUser - The currently logged-in user.
 */
const Header = ({ onLogout, currentUser }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hệ thống iBanking - TDTU
        </Typography>
        {currentUser && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              Xin chào, {currentUser.fullname}
            </Typography>
            <Button color="inherit" onClick={onLogout}>
              Đăng xuất
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
