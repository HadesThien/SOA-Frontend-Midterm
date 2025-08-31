import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "./components/common/Sidebar";
import Header from "./components/common/Header";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import PaymentPage from "./pages/PaymentPage";
import TransHistoryPage from "./pages/TransHistoryPage";

// const drawerWidth = 240;

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setCurrentUser(user);
    setSidebarOpen(true); // Mở sidebar ngay sau đăng nhập
    navigate("/user");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    // setSidebarOpen(false);
    navigate("/");
  };

  return (
     <Box sx={{ display: "flex" }}>
      {/* Sidebar chỉ hiển thị khi đã đăng nhập */}
      {currentUser && (
        <Sidebar
          open={sidebarOpen}
          onClose={handleToggleSidebar}
          onNavigate={(page) => {
            navigate(`/${page}`);
          }}
        />
      )}

       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header chỉ hiển thị khi đã đăng nhập */}
        {currentUser && (
          <>
            <Header
              currentUser={currentUser}
              onLogout={handleLogout}
              onToggleSidebar={handleToggleSidebar}
              sidebarOpen={sidebarOpen} 
            />
            <Toolbar />
          </>
        )}
        
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
            path="/transactions"
            element={
              currentUser ? (
                // <TransHistoryPage />
                  <TransHistoryPage currentUser={currentUser} />
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
