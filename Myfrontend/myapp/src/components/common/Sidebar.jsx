import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import HistoryIcon from "@mui/icons-material/History";
import { useLocation, Link } from "react-router-dom";

const drawerWidth = 240;
const miniWidth = 60;

export default function Sidebar({ open }) {
  const location = useLocation(); // lấy path hiện tại

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
          background: "linear-gradient(45deg, #1976d2, #42a5f5)",
          color: "white",
          borderRight: "none",
          top: "64px", // đẩy xuống dưới header
          height: "calc(100% - 64px)",
        },
      }}
      open={open}
    >
      <Divider />
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
                  borderRadius: "8px", // bo tròn item đẹp hơn
                  mx: 1, // cách mép một chút
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.25)", // nền mờ khi active
                    fontWeight: "bold",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "rgba(255,255,255,0.35)", // hover khi active
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.15)", // hover bình thường
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    color: "inherit", // giữ icon màu trắng
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
