import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/common/SideBar';
import Footer from '../components/common/Footer';

const drawerWidth = 240;

const DashboardLayout = ({ user }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '90vh' }}>
      <SideBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        {/* Nội dung chính */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>

        {/* Footer luôn nằm dưới */}
        <Footer />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
