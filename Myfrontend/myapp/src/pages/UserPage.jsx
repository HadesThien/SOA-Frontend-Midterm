// import { Box, Paper, Typography, Stack } from "@mui/material";

// export default function UserPage({ user }) {
//   if (!user) {
//     return (
//       <Box sx={{ p: 3, textAlign: "center" }}>
//         <Typography variant="h6" color="error">
//           Bạn chưa đăng nhập.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         bgcolor: "#f5f5f5",
//       }}
//     >
//       <Paper elevation={3} sx={{ p: 4, width: 400 }}>
//         <Typography variant="h5" gutterBottom align="center">
//           Thông tin người dùng
//         </Typography>

//         <Stack spacing={2}>
//           <Typography><b>Tên đăng nhập:</b> {user.username}</Typography>
//           <Typography><b>Họ và tên:</b> {user.fullname}</Typography>
//           <Typography><b>Số điện thoại:</b> {user.phone}</Typography>
//           <Typography><b>Email:</b> {user.email}</Typography>
//           <Typography>
//             <b>Số dư khả dụng:</b> {user.available_balance.toLocaleString()} ₫
//           </Typography>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// }
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Typography,
  Stack,
} from '@mui/material';

export default function UserPage({ user }) {
  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Bạn chưa đăng nhập.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 5,
        bgcolor: '#f0f2f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ maxWidth: 400, p: 3, textAlign: 'center' }} elevation={4}>
        <Avatar
          src={user.avatarUrl}
          sx={{ width: 80, height: 80, margin: 'auto', mb: 2 }}
        >
          {user.fullname?.[0]}
        </Avatar>
        <Typography variant="h5" gutterBottom>
          {user.fullname}
        </Typography>
        <CardContent>
          <Stack spacing={1} alignItems="flex-start">
            <Typography variant="body2"><b>Tên đăng nhập:</b> {user.username}</Typography>
            <Typography variant="body2"><b>Số điện thoại:</b> {user.phone}</Typography>
            <Typography variant="body2"><b>Email:</b> {user.email}</Typography>
            <Typography variant="body2"><b>Số dư khả dụng:</b> {user.available_balance.toLocaleString()} ₫</Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained">Chỉnh sửa</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
