import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from "./components/common/Sidebar";
import Header from "./components/common/Header";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import PaymentPage from "./pages/PaymentPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setCurrentUser(user);
    navigate("/user");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      {/* Chỉ hiển thị Sidebar nếu đã đăng nhập */}
      {currentUser && <Sidebar />}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header luôn hiển thị nhưng sẽ có nút Đăng xuất nếu có user */}
        <Header onLogout={handleLogout} currentUser={currentUser} />

        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/user"
            element={
              currentUser ? (
                <UserPage user={currentUser} />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
           <Route
            path="/payment"
            element={
              currentUser ? (
                <PaymentPage currentUser={currentUser} />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="*"
            element={
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h4">Trang không tồn tại</Typography>
              </Box>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}
