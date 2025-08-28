import { Box, Paper, Typography, Stack } from "@mui/material";

export default function UserPage({ user }) {
  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Bạn chưa đăng nhập.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          Thông tin người dùng
        </Typography>

        <Stack spacing={2}>
          <Typography><b>Tên đăng nhập:</b> {user.username}</Typography>
          <Typography><b>Họ và tên:</b> {user.fullname}</Typography>
          <Typography><b>Số điện thoại:</b> {user.phone}</Typography>
          <Typography><b>Email:</b> {user.email}</Typography>
          <Typography>
            <b>Số dư khả dụng:</b> {user.available_balance.toLocaleString()} ₫
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
