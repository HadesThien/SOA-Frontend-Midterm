// import React from 'react';
// import { Box, Typography, Paper, Grid, Card, CardContent, Divider } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const StyledCard = styled(Card)(({ theme }) => ({
//   boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//   borderRadius: theme.spacing(2),
//   transition: 'transform 0.3s ease-in-out',
//   '&:hover': {
//     transform: 'translateY(-5px)',
//   },
// }));

// const StyledValue = styled(Typography)(({ theme }) => ({
//   fontWeight: 'bold',
//   color: theme.palette.primary.main,
// }));

// /**
//  * @name AccountInfoPage
//  * @description Page component to display user account information.
//  * @param {object} props - Component props.
//  * @param {object} props.user - The logged-in user object.
//  */
// const AccountInfoPage = ({ user }) => {
//   if (!user) {
//     return <Typography>Loading...</Typography>; // Or redirect to login
//   }

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Chào mừng, {user.fullname}!
//       </Typography>
//       <Typography variant="body1" color="text.secondary" gutterBottom>
//         Đây là thông tin chi tiết về tài khoản của bạn.
//       </Typography>

//       <Grid container spacing={4} sx={{ mt: 2 }}>
//         <Grid item xs={12} md={6}>
//           <StyledCard>
//             <CardContent>
//               <Typography variant="h6" color="text.secondary" gutterBottom>
//                 Thông tin cá nhân
//               </Typography>
//               <Divider sx={{ mb: 2 }} />
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1">
//                     **Tên người dùng:** <StyledValue component="span">{user.username}</StyledValue>
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1">
//                     **Họ và tên:** <StyledValue component="span">{user.fullname}</StyledValue>
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1">
//                     **Email:** <StyledValue component="span">{user.email}</StyledValue>
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1">
//                     **Số điện thoại:** <StyledValue component="span">{user.phone}</StyledValue>
//                   </Typography>
//                 </Grid>
//                 {/* Bạn có thể thêm 'địa chỉ' tại đây nếu có */}
//               </Grid>
//             </CardContent>
//           </StyledCard>
//         </Grid>
        
//         <Grid item xs={12} md={6}>
//           <StyledCard>
//             <CardContent>
//               <Typography variant="h6" color="text.secondary" gutterBottom>
//                 Thông tin tài khoản
//               </Typography>
//               <Divider sx={{ mb: 2 }} />
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1">
//                     **Số dư khả dụng:**
//                     <StyledValue component="span" sx={{ ml: 1, color: '#4caf50' }}>
//                       {user.available_balance.toLocaleString('vi-VN')} VNĐ
//                     </StyledValue>
//                   </Typography>
//                 </Grid>
//                 {/* Bạn có thể thêm các thông tin tài khoản khác tại đây */}
//               </Grid>
//             </CardContent>
//           </StyledCard>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default AccountInfoPage;

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Avatar,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const InfoItem = ({ icon, label, value }) => (
  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
      {icon}
    </Avatar>
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  </Stack>
);

const AccountInfoPage = ({ user }) => {
  if (!user) return <Typography>Đang tải thông tin...</Typography>;

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        👋 Xin chào, {user.fullname}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Đây là bảng thông tin tài khoản của bạn.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Thông tin cá nhân */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                👤 Thông tin cá nhân
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <InfoItem
                icon={<AccountCircleIcon />}
                label="Tên người dùng"
                value={user.username}
              />
              <InfoItem
                icon={<AccountCircleIcon />}
                label="Họ và tên"
                value={user.fullname}
              />
              <InfoItem
                icon={<EmailIcon />}
                label="Email"
                value={user.email}
              />
              <InfoItem
                icon={<PhoneIcon />}
                label="Số điện thoại"
                value={user.phone}
              />
              {/* Thêm địa chỉ nếu có */}
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Thông tin tài khoản */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                💰 Thông tin tài khoản
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <InfoItem
                icon={<MonetizationOnIcon />}
                label="Số dư khả dụng"
                value={`${user.available_balance.toLocaleString('vi-VN')} VNĐ`}
              />
              {/* Thêm thông tin khác nếu cần */}
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountInfoPage;
