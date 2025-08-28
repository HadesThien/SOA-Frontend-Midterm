import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { findUserByStudentId } from "../api/userApi";

export default function PaymentPage({ currentUser }) {
  const [studentId, setStudentId] = useState("");
  const [targetUser, setTargetUser] = useState(null); // người được thanh toán hộ
  const [error, setError] = useState("");
  const [otpStage, setOtpStage] = useState(null); // khoản học phí đang cần OTP
  const [otpInput, setOtpInput] = useState("");

  const handleSearch = async () => {
    try {
      setError("");
      const user = await findUserByStudentId(studentId);
      setTargetUser(user);
    } catch (err) {
      setTargetUser(null);
      setError(err.message);
    }
  };

  const handlePay = (fee) => {
    if (currentUser.available_balance < fee.amount) {
      setError("Số dư không đủ để thanh toán!");
      return;
    }
    setError("");
    setOtpStage(fee); // chuyển qua bước OTP
  };

  const handleConfirmOtp = () => {
    if (otpInput === "123456") {
      alert(`Thanh toán thành công cho khoản ${otpStage.title}!`);
      setOtpStage(null);
      setOtpInput("");
    } else {
      setError("Mã OTP không chính xác!");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Thanh toán học phí
      </Typography>

      {/* Ô tìm MSSV */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Mã số sinh viên"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Tìm
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Nếu tìm thấy sinh viên */}
      {targetUser && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Thông tin sinh viên</Typography>
            <Typography>MSSV: {targetUser.studentId}</Typography>
            <Typography>Họ tên: {targetUser.fullname}</Typography>
            <Typography>
              Số dư khả dụng của bạn: {currentUser.available_balance.toLocaleString()} VND
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Các khoản học phí chưa thanh toán
            </Typography>
            <List>
              {targetUser.tuition
                .filter((t) => !t.paid)
                .map((t) => (
                  <ListItem
                    key={t.id}
                    secondaryAction={
                      <Button variant="contained" onClick={() => handlePay(t)}>
                        Thanh toán
                      </Button>
                    }
                  >
                    <ListItemText
                      primary={t.title}
                      secondary={`Số tiền: ${t.amount.toLocaleString()} VND`}
                    />
                  </ListItem>
                ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Form nhập OTP */}
      {otpStage && (
        <Card>
          <CardContent>
            <Typography variant="h6">
              Nhập mã OTP để thanh toán: {otpStage.title}
            </Typography>
            <TextField
              label="Mã OTP (demo: 123456)"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              sx={{ mt: 2, mr: 2 }}
            />
            <Button variant="contained" onClick={handleConfirmOtp}>
              Xác nhận
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
