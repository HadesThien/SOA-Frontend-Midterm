import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header({ onLogout, currentUser, onToggleSidebar }) {
  return (
    <AppBar position="static" elevation={2} color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onToggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
          {/* Xin chào + nút Đăng xuất */}
            <Typography variant="body1" sx={{ mr: 2 }}>
              Xin chào, <strong>{currentUser.fullname}</strong>
            </Typography>
            <Button color="inherit" variant="outlined" onClick={onLogout}>
              Đăng xuất
            </Button>
      </Toolbar>
    </AppBar>
  );
}
