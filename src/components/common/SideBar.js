// import React from 'react';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Box,
//   Typography,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import PaidIcon from '@mui/icons-material/Paid';
// import HistoryIcon from '@mui/icons-material/History';
// import { styled } from '@mui/material/styles';

// const drawerWidth = 280;

// // Styled components for better visual appeal
// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   '& .MuiDrawer-paper': {
//     width: drawerWidth,
//     boxSizing: 'border-box',
//     backgroundColor: '#0a1929',
//     color: '#ffffff',
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     '& .MuiToolbar-root': {
//       background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
//       minHeight: 64,
//       justifyContent: 'center',
//     },
//   },
// }));

// const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
//   '&:hover': {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     transform: 'translateX(5px)',
//     transition: 'all 0.3s ease-in-out',
//   },
//   '&.Mui-selected': {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderLeft: `5px solid ${theme.palette.secondary.main}`,
//     '& .MuiListItemIcon-root': {
//       color: theme.palette.secondary.main,
//     },
//     '& .MuiListItemText-primary': {
//       fontWeight: 'bold',
//     },
//   },
// }));

// const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
//   color: '#ffffff',
//   transition: 'color 0.3s ease-in-out',
// }));

// /**
//  * @name SideBar
//  * @description Reusable sidebar component for dashboard navigation.
//  */
// const SideBar = () => {
//   const navigate = useNavigate();

//   const menuItems = [
//     { text: 'Thông tin tài khoản', icon: <AccountCircleIcon />, path: 'account' },
//     { text: 'Học phí', icon: <PaidIcon />, path: 'tuition' },
//     { text: 'Lịch Sử', icon: <HistoryIcon />, path: 'history' },
//   ];

//   const currentPath = window.location.pathname.split('/').pop();

//   return (
//     <StyledDrawer variant="permanent">
//       <Toolbar>
//         <Typography variant="h6" sx={{ color: 'white' }}>Menu</Typography>
//       </Toolbar>
//       <List>
//         {menuItems.map((item) => (
//           <ListItem key={item.text} disablePadding>
//             <StyledListItemButton
//               selected={currentPath === item.path}
//               onClick={() => navigate(item.path)}
//             >
//               <StyledListItemIcon>{item.icon}</StyledListItemIcon>
//               <ListItemText primary={item.text} />
//             </StyledListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Box sx={{ flexGrow: 1 }} />
//       <Box sx={{ p: 2, textAlign: 'center' }}>
//         <Typography variant="caption" color="text.secondary">
//           © 2024 iBanking System
//         </Typography>
//       </Box>
//     </StyledDrawer>
//   );
// };

// export default SideBar;


import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import HistoryIcon from '@mui/icons-material/History';
import { styled } from '@mui/material/styles';

const drawerWidth = 280;
const headerHeight = 64; // Chiều cao của Header

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#0a1929',
    color: '#ffffff',
    marginTop: `${headerHeight}px`, // Đẩy xuống dưới Header
    height: `calc(100vh - ${headerHeight}px)`, // Giới hạn chiều cao
    overflowY: 'auto', // Cho phép scroll nếu cần
    borderRight: '1px solid #1e2a38',
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(5px)',
    transition: 'all 0.3s ease-in-out',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderLeft: `5px solid ${theme.palette.secondary.main}`,
    '& .MuiListItemIcon-root': {
      color: theme.palette.secondary.main,
    },
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
    },
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: '#ffffff',
  transition: 'color 0.3s ease-in-out',
}));

const SideBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Thông tin tài khoản', icon: <AccountCircleIcon />, path: 'account' },
    { text: 'Học phí', icon: <PaidIcon />, path: 'tuition' },
    { text: 'Lịch sử', icon: <HistoryIcon />, path: 'history' },
  ];

  const currentPath = window.location.pathname.split('/').pop();

  return (
    <StyledDrawer variant="permanent">
      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
          Menu
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <StyledListItemButton
                selected={currentPath === item.path}
                onClick={() => navigate(item.path)}
              >
                <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                <ListItemText primary={item.text} />
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mt: 'auto', p: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          © 2024 iBanking System
        </Typography>
      </Box>
    </StyledDrawer>
  );
};

export default SideBar;
