import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PolicyIcon from '@mui/icons-material/Policy';

const FooterLinks = () => {
  const links = [
    { label: 'Trang chủ', href: '/', icon: <HomeIcon /> },
    { label: 'Tài khoản', href: '/account', icon: <AccountCircleIcon /> },
    { label: 'Hỗ trợ', href: '/support', icon: <HelpOutlineIcon /> },
    { label: 'Chính sách bảo mật', href: '/privacy', icon: <PolicyIcon /> },
  ];

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Liên kết nhanh
      </Typography>
      <Stack spacing={1}>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            underline="none"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'text.primary',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'primary.main',
                transform: 'translateX(4px)',
              },
            }}
          >
            {link.icon}
            <Typography variant="body2">{link.label}</Typography>
          </Link>
        ))}
      </Stack>
    </Box>
  );
};

export default FooterLinks;
