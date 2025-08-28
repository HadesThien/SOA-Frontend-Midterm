import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import HistoryIcon from "@mui/icons-material/History";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {/* User Page */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/user">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Thông tin User" />
          </ListItemButton>
        </ListItem>

        {/* Payment Page */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/payment">
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Thanh toán" />
          </ListItemButton>
        </ListItem>

        {/* Transaction History */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/transactions">
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Lịch sử giao dịch" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
