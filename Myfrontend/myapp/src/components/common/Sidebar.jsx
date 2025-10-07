import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import HistoryIcon from "@mui/icons-material/History";
import { useLocation, Link } from "react-router-dom";

const drawerWidth = 240;
const miniWidth = 60;

export default function Sidebar({ open }) {
  const location = useLocation();

  const items = [
    { to: "/user", icon: <AccountCircleIcon />, text: "Thông tin User" },
    { to: "/payment", icon: <PaymentIcon />, text: "Thanh toán" },
    { to: "/transactions", icon: <HistoryIcon />, text: "Lịch sử giao dịch" },
  ];

  return (
    <Drawer
      variant="permanent"
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
          background: "linear-gradient(135deg, #1f2f98, #3a7bd5, #00d2ff)", // gradient sang hơn chút
          color: "white",
          borderRight: "none",
          top: "64px",
          height: "calc(100% - 64px)",
          boxShadow: "2px 0 8px rgba(0,0,0,0.4)",
        },
      }}
      open={open}
    >
      {/* Logo hoặc tiêu đề nhỏ */}
      {open && (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", letterSpacing: "1px" }}
          >
            TDTU
          </Typography>
        </Box>
      )}

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <List>
        {items.map(({ to, icon, text }, idx) => {
          const selected = location.pathname === to;
          return (
            <ListItem key={idx} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={to}
                selected={selected}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  borderRadius: "10px",
                  mx: 1,
                  my: 0.5,
                  transition: "all 0.3s ease",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    fontWeight: "bold",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "rgba(255,255,255,0.3)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                    transform: "translateX(4px)", // hiệu ứng trượt nhẹ khi hover
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {icon}
                </ListItemIcon>
                {open && <ListItemText primary={text} />}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
