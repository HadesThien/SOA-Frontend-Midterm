

import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Container,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Fade,
  Grow,
  Slide,
  Paper,
  Grid,
} from "@mui/material";
import {
  Person as PersonIcon,
  Badge as BadgeIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  AccountBalanceWallet as WalletIcon,
  Email as EmailIcon,
  Star as StarIcon,
} from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: { main: "#1e90ff", light: "#63b3ff", dark: "#006ad1" },
    secondary: { main: "#00bfff", light: "#33ccff" },
    success: { main: "#10b981", light: "#34d399" },
    background: { default: "linear-gradient(135deg, #1e90ff 0%, #00bfff 100%)" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: { fontWeight: 800, letterSpacing: "-0.02em" },
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
  },
  shape: { borderRadius: 20 },
});

/* Helper: lấy giá trị từ nhiều key khả dĩ */
function pick(user = {}, keys = [], fallback = "") {
  for (const k of keys) {
    if (user[k] !== undefined && user[k] !== null && String(user[k]).trim() !== "") {
      return user[k];
    }
  }
  return fallback;
}

/* InfoCard: một ô thông tin */
function InfoCard({ icon, label, value, highlight = false, delay = 0 }) {
  return (
    <Slide
      direction="up"
      in={true}
      timeout={700}
      style={{ transitionDelay: `${delay}ms` }}
      mountOnEnter
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          background: highlight
            ? "linear-gradient(135deg, #10b981 0%, #34d399 100%)"
            : "rgba(255,255,255,0.9)",
          color: highlight ? "white" : "text.primary",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: highlight
                ? "rgba(255,255,255,0.18)"
                : "linear-gradient(135deg, #1e90ff 0%, #00bfff 100%)",
              color: "white",
            }}
          >
            {icon}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                opacity: highlight ? 0.9 : 0.7,
                textTransform: "uppercase",
              }}
            >
              {label}
            </Typography>
            <Typography
              sx={{
                fontWeight: highlight ? 700 : 600,
                fontSize: highlight ? "1.15rem" : "1rem",
              }}
            >
              {value ?? "N/A"}
            </Typography>
          </Box>

          {highlight && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <StarIcon sx={{ fontSize: 18, color: "white" }} />
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "white" }}>
                VIP
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Slide>
  );
}

export default function UserPage({ currentUser }) {
  if (!currentUser) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #1e90ff 0%, #00bfff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          <Card sx={{ p: 4, borderRadius: 3, background: "rgba(255,255,255,0.12)", color: "white" }}>
            <Typography variant="h6">Vui lòng đăng nhập để xem thông tin người dùng</Typography>
          </Card>
        </Box>
      </ThemeProvider>
    );
  }

  // Map field
  const fullname = pick(currentUser, ["fullname", "fullName", "name", "displayName"], "");
  const username = pick(currentUser, ["username", "user_name", "account"], "");
  const email = pick(currentUser, ["email", "mail"], "");
  const studentId = pick(currentUser, ["auth_id", "student_id", "mssv"], "");
  const phone = pick(currentUser, ["phone", "phoneNumber", "tel"], "");
  const address = pick(currentUser, ["address", "location"], "");
  const balance =
    currentUser?.available_balance ??
    currentUser?.availableBalance ??
    currentUser?.balance ??
    null;

  const formatBalance = (b) => (typeof b === "number" ? b.toLocaleString("vi-VN") + " đ" : "N/A");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(225deg, #1f2f98, #3a7bd5, #00d2ff)",
          py: { xs: 6, md: 10 },
          px: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grow in={true} timeout={1000}>
            <Card sx={{ background: "rgba(255,255,255,0.14)", borderRadius: 4, p: 4 }}>
              <Grid container spacing={4}>
                {/* Bên trái: Avatar */}
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      bgcolor: "rgba(255,255,255,0.08)",
                      borderRadius: 3,
                      p: 3,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 140,
                        height: 140,
                        mb: 2,
                        background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 70, color: "#1e90ff" }} />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "white" }}>
                      {fullname || username || "Người dùng"}
                    </Typography>
                    {username && (
                      <Chip
                        label={`@${username}`}
                        sx={{
                          mt: 1,
                          background: "rgba(255,255,255,0.14)",
                          color: "white",
                          fontWeight: 700,
                        }}
                      />
                    )}
                  </Box>
                </Grid>

                {/* Bên phải: Thông tin */}
                <Grid item xs={12} md={8}>
                  <Box sx={{ p: 2 }}>
                    <InfoCard icon={<EmailIcon />} label="Email" value={email} delay={0} />
                    <InfoCard icon={<BadgeIcon />} label="Mã số sinh viên" value={studentId} delay={100} />
                    <InfoCard icon={<PhoneIcon />} label="Số điện thoại" value={phone} delay={200} />
                    <InfoCard icon={<HomeIcon />} label="Địa chỉ" value={address} delay={300} />
                    <InfoCard
                      icon={<WalletIcon />}
                      label="Số dư khả dụng"
                      value={formatBalance(balance)}
                      highlight
                      delay={400}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grow>
        </Container>
      </Box>
    </ThemeProvider>
  );
}



