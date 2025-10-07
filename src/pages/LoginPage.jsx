// import { useState } from "react";
// import { Box, Paper, Typography, TextField, Button, Stack } from "@mui/material";
// import { loginUser, getCurrentUser } from "../api/userApi"; // đổi đường dẫn đúng tới file userApi.js

// export default function LoginPage({ onLogin }) {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//      // const user = await loginUser(form.username, form.password);
//       const tokens = await loginUser(form.username, form.password);
//       // console.log(tokens)
//       localStorage.setItem("access_token", tokens.access_token);
//       localStorage.setItem("refresh_token", tokens.refresh_token);

//       const userData = await getCurrentUser();
//       onLogin(userData); // truyền user về App
//     } catch (err) {
//       setError(err.message); //  hiện lỗi từ userApi (VD: "Tên đăng nhập hoặc mật khẩu không chính xác.")
//     }
//   };

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
//       <Paper elevation={3} sx={{ p: 4, width: 360 }}>
//         <Typography variant="h5" align="center" gutterBottom>
//           Đăng nhập iBanking
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Stack spacing={2}>
//             <TextField
//               label="Tên đăng nhập"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//             <TextField
//               label="Mật khẩu"
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//             {error && (
//               <Typography color="error" variant="body2">
//                 {error}
//               </Typography>
//             )}
//             <Button type="submit" variant="contained" fullWidth> 
//               Đăng nhập 
//             </Button>
//           </Stack>
//         </form>
//       </Paper>
//     </Box>
//   );
// }
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
  InputAdornment,
} from "@mui/material";
import { Person, Lock } from "@mui/icons-material";
import { loginUser, getCurrentUser } from "../api/userApi";

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const tokens = await loginUser(form.username, form.password);
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);

      const userData = await getCurrentUser();
      onLogin(userData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f3f4f6",
        fontFamily: "Roboto, sans-serif",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          maxWidth: 850,
          width: "100%",
        }}
      >
        <Grid container>
          {/* Panel trái */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              background: "#4b7ed7ff", // màu đỏ như hình
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 5,
              textAlign: "center",
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              iBANKING FOR TDTU
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Truy cập và quản lý tài khoản sinh viên
              <br />
              mọi lúc, mọi nơi.
            </Typography>
          </Grid>

          {/* Form đăng nhập */}
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#4b7ed7ff" }}
            >
              XIN CHÀO!
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* Ô nhập tên đăng nhập */}
                <TextField
                  label="Tên đăng nhập"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      fontSize: "1rem",
                      bgcolor: "#f9fafb",
                      "&:hover fieldset": {
                        borderColor: "#2563eb",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2563eb",
                        borderWidth: 2,
                      },
                      "&.Mui-focused": {
                        bgcolor: "#e0f2fe",
                      },
                    },
                  }}
                />

                {/* Ô nhập mật khẩu */}
                <TextField
                  label="Mật khẩu"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      fontSize: "1rem",
                      bgcolor: "#f9fafb",
                      "&:hover fieldset": {
                        borderColor: "#2563eb",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2563eb",
                        borderWidth: 2,
                      },
                      "&.Mui-focused": {
                        bgcolor: "#e0f2fe",
                      },
                    },
                  }}
                />

                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}

                {/* Nút đăng nhập */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#4b7ed7ff", // đỏ như hình
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1.1rem",
                    "&:hover": { bgcolor: "#4b7ed7ff" },
                  }}
                  fullWidth
                >
                  Đăng nhập
                </Button>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
