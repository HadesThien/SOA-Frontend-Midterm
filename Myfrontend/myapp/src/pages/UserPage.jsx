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
// import React from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   CardActions,
//   Avatar,
//   Button,
//   Typography,
//   Stack,
// } from '@mui/material';

// export default function UserPage({ user }) {
//   if (!user) {
//     return (
//       <Box sx={{ p: 3, textAlign: 'center' }}>
//         <Typography variant="h6" color="error">
//           Bạn chưa đăng nhập.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         py: 5,
//         bgcolor: '#f0f2f5',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <Card sx={{ maxWidth: 400, p: 3, textAlign: 'center' }} elevation={4}>
//         <Avatar
//           src={user.avatarUrl}
//           sx={{ width: 80, height: 80, margin: 'auto', mb: 2 }}
//         >
//           {user.fullname?.[0]}
//         </Avatar>
//         <Typography variant="h5" gutterBottom>
//           {user.fullname}
//         </Typography>
//         <CardContent>
//           <Stack spacing={1} alignItems="flex-start">
//             <Typography variant="body2"><b>Tên đăng nhập:</b> {user.username}</Typography>
//             <Typography variant="body2"><b>Số điện thoại:</b> {user.phone}</Typography>
//             <Typography variant="body2"><b>Email:</b> {user.email}</Typography>
//             <Typography variant="body2"><b>Số dư khả dụng:</b> {user.available_balance.toLocaleString()} ₫</Typography>
//           </Stack>
//         </CardContent>
//         <CardActions sx={{ justifyContent: 'center' }}>
//           <Button variant="contained">Chỉnh sửa</Button>
//         </CardActions>
//       </Card>
//     </Box>
//   );
// }
// import { Box, Grid, Card, CardContent, Avatar, Typography, Divider } from "@mui/material";

// export default function UserPage({ user }) {
//   if (!user) {
//     return (
//       <Box p={3}>
//         <Typography variant="h6" color="text.secondary">
//           Vui lòng đăng nhập để xem thông tin người dùng.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={3}>
//       {/* Header Section */}
//       <Typography variant="h4" gutterBottom fontWeight="bold">
//         Thông tin người dùng
//       </Typography>

//       <Card>
//         <CardContent>
//           <Grid container spacing={4}>
//             {/* Avatar bên trái */}
//             <Grid
//               item
//               xs={12}
//               md={3}
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//             >
//               <Avatar
//                 alt={user?.fullname}
//                 sx={{ width: 120, height: 120, bgcolor: "primary.main", fontSize: 32 }}
//               >
//                 {user?.fullname?.[0] || "U"}
//               </Avatar>
//             </Grid>

//             {/* Info bên phải */}
//             <Grid item xs={12} md={9}>
//               <Typography variant="h5" fontWeight="bold">
//                 {user?.fullname}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 {user?.email}
//               </Typography>
//               <Typography variant="body2" color="primary">
//                 MSSV: {user?.studentId}
//               </Typography>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 3 }} />

//           {/* Personal Details Grid */}
//           <Typography variant="h6" gutterBottom fontWeight="bold">
//             Chi tiết cá nhân
//           </Typography>

//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 Tên đăng nhập
//               </Typography>
//               <Typography variant="body1">{user?.username}</Typography>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 MSSV
//               </Typography>
//               <Typography variant="body1">{user?.studentId}</Typography>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 Số điện thoại
//               </Typography>
//               <Typography variant="body1">{user?.phone}</Typography>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 Địa chỉ
//               </Typography>
//               <Typography variant="body1">{user?.address}</Typography>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle2" color="text.secondary">
//                 Số dư khả dụng
//               </Typography>
//               <Typography variant="body1" color="success.main" fontWeight="bold">
//                 {user?.available_balance?.toLocaleString()} đ
//               </Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Avatar,
//   Divider,
// } from "@mui/material";

// export default function UserPage({ user }) {
//   if (!user) {
//     return <Typography>Vui lòng đăng nhập để xem thông tin người dùng</Typography>;
//   }

//   return (
//     <Box display="flex" justifyContent="center" p={3}>
//       <Card sx={{ maxWidth: 800, width: "100%", p: 3, borderRadius: 3, boxShadow: 4 }}>
//         <CardContent>
//           {/* Avatar + Basic info */}
//           <Box display="flex" alignItems="center" mb={3}>
//             <Avatar
//               sx={{ width: 80, height: 80, mr: 2 }}
//             >
//               {user.fullname[0]}
//             </Avatar>
//             <Box>
//               <Typography variant="h5" fontWeight="bold">
//                 {user.fullname}
//               </Typography>
//               <Typography variant="subtitle1" color="text.secondary">
//                 {user.email}
//               </Typography>
//             </Box>
//           </Box>

//           <Divider sx={{ my: 2 }} />

//           {/* Personal details section */}
//           <Typography variant="h6" gutterBottom>
//             Thông tin cá nhân
//           </Typography>

//           <DetailRow label="Tên đăng nhập" value={user.username} />
//           <DetailRow label="MSSV" value={user.studentId} />
//           <DetailRow label="Số điện thoại" value={user.phone} />
//           <DetailRow label="Địa chỉ" value={user.address} />
//           <DetailRow
//             label="Số dư khả dụng"
//             value={user.available_balance.toLocaleString("vi-VN") + " đ"}
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// function DetailRow({ label, value }) {
//   return (
//     <Box
//       display="flex"
//       justifyContent="space-between"
//       py={1}
//       sx={{ borderBottom: "1px dashed rgba(255,255,255,0.1)" }}
//     >
//       <Typography variant="body2" color="text.secondary">
//         {label}:
//       </Typography>
//       <Typography variant="body1" fontWeight="500">
//         {value}
//       </Typography>
//     </Box>
//   );
// }
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Person as PersonIcon,
  Badge as BadgeIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  AccountBalanceWallet as WalletIcon,
} from "@mui/icons-material";

export default function UserPage({ user }) {
  if (!user) {
    return <Typography>Vui lòng đăng nhập để xem thông tin người dùng</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" p={3}>
      <Card
        sx={{
          maxWidth: 700,
          width: "100%",
          borderRadius: 4,
          boxShadow: 6,
          background: "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
        }}
      >
        <CardContent>
          {/* Avatar + Basic info */}
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                mr: 3,
                bgcolor: "#3f51b5",
                fontSize: 32,
              }}
            >
              {user.fullname[0]}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {user.fullname}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Personal details section */}
          <Typography variant="h6" gutterBottom fontWeight="600" color="primary">
            Thông tin cá nhân
          </Typography>

          <DetailRow icon={<PersonIcon />} label="Tên đăng nhập" value={user.username} />
          <DetailRow icon={<BadgeIcon />} label="MSSV" value={user.studentId} />
          <DetailRow icon={<PhoneIcon />} label="Số điện thoại" value={user.phone} />
          <DetailRow icon={<HomeIcon />} label="Địa chỉ" value={user.address} />
          <DetailRow
            icon={<WalletIcon />}
            label="Số dư khả dụng"
            value={user.available_balance.toLocaleString("vi-VN") + " đ"}
            highlight
          />
        </CardContent>
      </Card>
    </Box>
  );
}

function DetailRow({ icon, label, value, highlight }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py={1.5}
      px={1}
      sx={{
        borderBottom: "1px solid #eee",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        {icon}
        <Typography variant="body2" color="text.secondary">
          {label}:
        </Typography>
      </Box>
      <Typography
        variant="body1"
        fontWeight={highlight ? "bold" : "500"}
        color={highlight ? "green" : "text.primary"}
      >
        {value}
      </Typography>
    </Box>
  );
}

