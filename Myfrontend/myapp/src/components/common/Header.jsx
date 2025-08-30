import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240; // chiều rộng sidebar khi mở
const miniWidth = 60;

export default function Header({ onLogout, currentUser, onToggleSidebar, sidebarOpen }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        // backgroundColor: "#1976d2",
        backgroundImage: "linear-gradient(180deg, #1976d2, #42a5f5)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        // width: `calc(100% - ${sidebarOpen ? drawerWidth : miniWidth}px)`,
        // marginLeft: `${sidebarOpen ? drawerWidth : miniWidth}px`,
        // transition: (theme) =>
        //   theme.transitions.create(["width", "margin"], {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.leavingScreen,
        //   }),
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onToggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
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
