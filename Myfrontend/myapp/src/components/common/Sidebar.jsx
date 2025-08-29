import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import HistoryIcon from "@mui/icons-material/History";
import { useLocation, Link } from "react-router-dom";

const drawerWidth = 240;
const miniWidth = 60;

export default function Sidebar({ open, onToggle, onClose }) {
  const location = useLocation(); // lấy path hiện tại

  const items = [
    { to: "/user", icon: <AccountCircleIcon />, text: "Thông tin User" },
    { to: "/payment", icon: <PaymentIcon />, text: "Thanh toán" },
    { to: "/transactions", icon: <HistoryIcon />, text: "Lịch sử giao dịch" },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : miniWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : miniWidth,
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
            }),
          overflowX: "hidden",
        },
      }}
    >
      <Divider />
      <List>
        {items.map(({ to, icon, text }, idx) => (
          <ListItem
            key={idx}
            disablePadding
            sx={{ justifyContent: open ? "initial" : "center" }}
          >
            <ListItemButton
              component={Link}
              to={to}
              selected={location.pathname === to} // giữ đậm khi đang ở route
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                {icon}
              </ListItemIcon>
              {open && <ListItemText primary={text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
