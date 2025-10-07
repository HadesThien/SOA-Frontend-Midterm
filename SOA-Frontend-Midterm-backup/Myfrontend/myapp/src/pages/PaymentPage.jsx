import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  Card,
  CardContent,
  Avatar,
  Grid,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import { findUserByStudentId } from "../api/userApi";
import { getTuitionsByStudentId } from "../api/tuitionsApi";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PhoneIcon from "@mui/icons-material/Phone";
import { styled } from "@mui/material/styles";


import { addTransaction, verifyTransactionReal } from "../api/transactionApi";
import * as transactionApi from "../api/transactionApi";
console.log("Available exports:", transactionApi);

export default function PaymentPage({ currentUser }) {
  const [studentId, setStudentId] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [error, setError] = useState(""); 
  const [otpError, setOtpError] = useState(""); 
  const [successMsg, setSuccessMsg] = useState("");
  const [otpStage, setOtpStage] = useState(null);
  const [otpInput, setOtpInput] = useState(Array(6).fill(""));
  const [agreed, setAgreed] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [confirmCloseOtp, setConfirmCloseOtp] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [agreedConfirm, setAgreedConfirm] = useState(false);
  const [pendingPaymentId, setPendingPaymentId] = useState(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info"); // "error", "success", "warning", "info"
  
  

  const InfoCard = styled(Box)(({ theme }) => ({
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    background: "rgba(255,255,255,0.8)",
    borderRadius: "16px",
    padding: theme.spacing(2),
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    },
  }));

  const IconWrapper = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #4f6ef7, #3b57d5)",
    color: "#fff",
    borderRadius: "12px",
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
  }));

  //Tra cứu học phí
  const handleSearch = async () => {
    setError("");
    setSuccessMsg("");
    setOtpError("");
    setTargetUser(null);
    setLoadingSearch(true);
    await new Promise((r) => setTimeout(r, 500)); // delay 500ms

    if (!studentId) {
      // setError("Vui lòng nhập mã sinh viên");
      showSnackbar("Không tìm thấy mã sinh viên này", "error");
      setLoadingSearch(false);
      return;
    }

    try {
      const data = await getTuitionsByStudentId(studentId);
      console.log("Danh sách học phí", data.tuitions);

      if(!data || !data.tuitions || data.tuitions.length ===0){
        // setError("Không tìm thấy học phí cho mã sinh viên này");
        showSnackbar("Không tìm thấy sinh viên này", "error");
      } else{
        showSnackbar("Tra cứu thành công!", "success");
        setTargetUser({
          studentId: data.student_id,
          fullname: "Sinh viên " + data.student_id,
          tuition: data.tuitions,
        });
      }
    } catch (err) {
      setError("Lỗi khi tìm kiếm học phí");
    } finally {
      setLoadingSearch(false);
    }   
  };

  //Hàm hiển thị Snackbar
  const showSnackbar = (message, severity = "info") => {
    setSnackbarMsg(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };


// const handleRefetchWithLoading = () => {
//   setIsLoadingStatus(true);
//   refetchTuition().finally(() => {
//     setIsLoadingStatus(false);
//   });
// };

// const handleRefetchWithLoading = () => {
//   setIsLoadingStatus(true);
//   setTimeout(() => {
//     refetchTuition().finally(() => {
//       setIsLoadingStatus(false);
//     });
//   }, 500); // delay 500ms để spinner kịp hiển thị
// };

const handleRefetchWithLoading = (showLoading = true) => {
  if (showLoading) setIsLoadingStatus(true);
  setTimeout(() => {
    refetchTuition().finally(() => {
      if (showLoading) setIsLoadingStatus(false);
    });
  }, 500);
};




const handleConfirmOtp = async () => {
  setOtpError(""); // reset lỗi cũ
  setSuccessMsg(""); // reset thông báo cũ
  setLoadingVerify(true);

  if (!otpInput || otpInput.length !== 6) {
    setOtpError("Vui lòng nhập mã OTP hợp lệ (6 chữ số).");
    setLoadingVerify(false);
    return;
  }
  try {
    const paymentId = otpStage?.payment_id;
    if (!paymentId){
      setOtpError("Không thể lấy mã giao dịch.");
      setLoadingVerify(false);
      return;
    }

    const verifyResponse = await verifyTransactionReal({
      email: currentUser.email,
      payment_id: paymentId,
      otp: otpInput.join("")//nối mảng thành chuỗi
    });

    if (
      verifyResponse.message?.toLowerCase().includes("invalid") ||
      verifyResponse.success === false
    ) {
      // setOtpError(verifyResponse.message || "Xác thực OTP không thành công.");
      //showSnackbar(verifyResponse.message || "Xác thực OTP không thành công.", "error");
      showSnackbar("Mã OTP không hợp lệ. Vui lòng thử lại.", "error"); 
      setLoadingVerify(false);
      setPendingPaymentId(paymentId);

      return;
    }

    currentUser.available_balance -= otpStage.amount;
    const updatedTuition = targetUser.tuition.map((t) =>
      t.id === otpStage.id ? { ...t, paid: true, status: "PAID" } : t
    );
    setTargetUser({ ...targetUser, tuition: updatedTuition });

    // setSuccessMsg(` Thanh toán thành công cho khoản ${otpStage.title}!`);
    showSnackbar(` Thanh toán thành công cho khoản ${otpStage.description}!`, "success");
    setOtpStage(null);
    setOtpInput("");
    setAgreed(false);
    setOtpDialogOpen(false); // đóng pop-up
  } catch (err) {
    setOtpError(err.message || "Lỗi xác thực OTP");
  } finally {
    setLoadingVerify(false);
  }

  const updated = await getTuitionsByStudentId(studentId);
  setTargetUser({
    studentId: updated.student_id,
    fullname: "Sinh viên " + updated.student_id,
    tuition: updated.tuitions
  });
}

  const refetchTuition = async () => {
          try {
            const updated = await getTuitionsByStudentId(studentId);
            setTargetUser({
              studentId: updated.student_id,
              fullname: "Sinh viên " + updated.student_id,
              tuition: updated.tuitions
            });
          } catch (err) {
            console.error("Lỗi khi refetch học phí:", err);
          }
        };

  const handleCancelOtp = () => {
    // Đóng giao diện OTP
      setOtpDialogOpen(false);
      setConfirmCloseOtp(false);

      // Giữ lại thông tin giao dịch (otpStage) trong 3 phút để Redis có thể expire
      // Không gọi setOtpStage(null) ngay lập tức

      // Reset các input và thông báo
      setOtpInput("");
      setOtpError("");
      setAgreed(false);
      setSuccessMsg("Hệ thống sẽ hoàn tác giao dịch sau khoảng 3 phút nếu OTP không được xác thực.");

      // Sau đúng 3 phút, xóa otpStage và refetch học phí để cập nhật trạng thái từ DB
      setTimeout(() => {
        setOtpStage(null); // xóa thông tin giao dịch sau khi Redis đã xử lý
        setPendingPaymentId(null); // cho phép tạo lại giao dịch sau 3 phút
        // refetchTuition();  // gọi lại API để lấy trạng thái mới từ DB
        handleRefetchWithLoading();
      }, 180000);

      // Gọi lại thêm 2 lần sau đó để đảm bảo frontend bắt được trạng thái mới
      [183000, 186000].forEach((delay) => {
        setTimeout(() => {
          // refetchTuition();
          handleRefetchWithLoading();
        }, delay);
      });
    };


  const handlePayment = (fee) => {
  setError("");
  setSelectedFee(fee);
  setAgreedConfirm(false);
  setConfirmDialogOpen(true); // mở form xác nhận
};

  const handleConfirmPayment = async () => {
    if (!selectedFee || !agreedConfirm) return;
    console.log("Số dư:", currentUser.available_balance, "Giá tiền:", selectedFee.amount);
    if (currentUser.available_balance < selectedFee.amount) {
      // setError("Số dư không đủ để thanh toán khoản này. Vui lòng nạp thêm");
      // setConfirmDialogOpen(false);
      showSnackbar("Số dư không đủ để thanh toán khoản này. Vui lòng nạp thêm", "error");
      setConfirmDialogOpen(false);
      return;
    }
      setLoadingCreate(true);
      try {
        const response = await addTransaction(selectedFee.id);
        const paymentId = response?.payment_id || response?.id;

        if (response?.success === false || !paymentId) {
          const msg = response?.message || "Không thể tạo giao dịch";
          // setError(response.message || "Không thể tạo giao dịch");
          showSnackbar(msg, "error");
          // setLoadingCreate(false);
          setConfirmDialogOpen(false);
          return;
        }

        // ✅ Cập nhật trạng thái tạm thời ngay
        const updatedTuition = targetUser.tuition.map((t) =>
          t.id === selectedFee.id ? { ...t, status: "IN_PROCESS" } : t
        );
        setTargetUser({ ...targetUser, tuition: updatedTuition });

        // ✅ Mở OTP
        setOtpStage({ ...selectedFee, payment_id: paymentId });
        setOtpInput("");
        setOtpError("");
        setSuccessMsg("");
        setOtpDialogOpen(true);
        setConfirmDialogOpen(false);
      } catch (err) {
        // setError(err.message || "Lỗi khi tạo giao dịch");
        showSnackbar(err.message || "Lỗi khi tạo giao dịch", "error");
        setConfirmDialogOpen(false);
      } finally {
        setLoadingCreate(false);
      }
  };

  return (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      background: "linear-gradient(180deg, #1f2f98, #3a7bd5, #00d2ff)",
      p: 3,
    }}
  >
    <Card
      sx={{
        width: "100%",
        maxWidth: 1100,
        borderRadius: 4,
        boxShadow: 6,
        p: 3,
        bgcolor: "rgba(255,255,255,0.9)",
      }}
    >
      <Typography variant="h5" gutterBottom fontWeight="bold" align="center">
        Thanh toán học phí
      </Typography>

      {/* Thông tin tài khoản */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(90deg, #4f6ef7, #3b57d5)",
            color: "white",
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <AccountCircleIcon />
          <Typography variant="h6" fontWeight="bold">
            Thông Tin Tài Khoản
          </Typography>
        </Box>

        {/* Nội dung */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 3,
            flexWrap: "wrap",
          }}
        >
          {/* Họ và tên */}
          <InfoCard>
            <IconWrapper>
              <AccountCircleIcon />
            </IconWrapper>
            <Box>
              <Typography variant="caption" color="text.secondary">
                HỌ VÀ TÊN
              </Typography>
              <Typography fontWeight="bold">{currentUser.fullname}</Typography>
            </Box>
          </InfoCard>

          {/* Số điện thoại */}
          <InfoCard>
            <IconWrapper>
              <PhoneIcon />
            </IconWrapper>
            <Box>
              <Typography variant="caption" color="text.secondary">
                SỐ ĐIỆN THOẠI
              </Typography>
              <Typography fontWeight="bold">{currentUser.phone}</Typography>
            </Box>
          </InfoCard>

          {/* Số dư */}
          <InfoCard>
            <IconWrapper>
              <AccountBalanceWalletIcon />
            </IconWrapper>
            <Box>
              <Typography variant="caption" color="text.secondary">
                SỐ DƯ TÀI KHOẢN
              </Typography>
              <Typography fontWeight="bold" color="green">
                {typeof currentUser?.available_balance === "number"
                  ? currentUser.available_balance.toLocaleString() + " VND"
                  : "N/A"}
              </Typography>
            </Box>
          </InfoCard>
        </Box>
      </Card>

      {/* Form tra cứu */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Mã sinh viên"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleSearch}
          sx={{ minWidth: 140 }}
        >
          Tra cứu
        </Button>
        {loadingSearch && <CircularProgress size={28} />}
      </Box>

      {/* Bảng học phí */}
      {targetUser && (
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Thông tin học phí của {targetUser.fullname}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#e3f2fd" }}>
                    <TableCell><b>ID</b></TableCell>
                    <TableCell><b>Mã SV</b></TableCell>
                    <TableCell><b>Mô tả</b></TableCell>
                    <TableCell><b>Giá tiền</b></TableCell>
                    <TableCell><b>Hạn thanh toán</b></TableCell>
                    <TableCell><b>Trạng thái</b></TableCell>
                    <TableCell><b>Hành động</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {targetUser.tuition.map((fee) => (
                    <TableRow key={fee.id} hover>
                      <TableCell>{fee.id}</TableCell>
                      <TableCell>{fee.student_id}</TableCell>
                      <TableCell>{fee.description}</TableCell>
                      <TableCell>
                        {typeof fee.amount === "number"
                          ? fee.amount.toLocaleString() + " VND"
                          : "N/A"}
                      </TableCell>
                      <TableCell>{fee.expires_at}</TableCell>
                      <TableCell>
                        <Typography
                          fontWeight="bold"
                          color={
                            fee.status === "PAID"
                              ? "green"
                              : fee.status === "IN_PROCESS"
                              ? "orange"
                              : fee.status === "EXPIRED"
                              ? "gray"
                              : "red"
                          }
                        >
                          {fee.status === "PAID"
                            ? "Đã thanh toán"
                            : fee.status === "IN_PROCESS"
                            ? "Đang xử lý"
                            : fee.status === "EXPIRED"
                            ? "Hết hạn"
                            : "Chưa thanh toán"}
                        </Typography>
                        {fee.status === "IN_PROCESS" && (
                        <Typography variant="caption" color="text.secondary">
                          Vui lòng chờ ít phút để thanh toán lại khoản này
                        </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {fee.status === "NOT_YET_PAID" &&
                          !otpStage &&
                          fee.id !== pendingPaymentId && (
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => handlePayment(fee)}
                              disabled={loadingCreate}
                              sx={{ textTransform: "none", fontWeight: "bold" }}
                            >
                              {loadingCreate ? "Đang xử lý..." : "Thanh toán"}
                            </Button>
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
      {/* Các Dialog, Snackbar, Backdrop giữ nguyên code của bạn */}
      {/** ... không thay đổi logic ... */}

     {/* <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Xác nhận thanh toán</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc muốn thanh toán khoản:</Typography>
          <Typography fontWeight="bold" sx={{ mt: 1 }}>
            {selectedFee?.description || "N/A"}
          </Typography>
          <Typography color="text.secondary">
            Số tiền: {typeof selectedFee?.amount === "number"
              ? selectedFee.amount.toLocaleString() + " VND"
              : "N/A"}
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={agreedConfirm}
                onChange={(e) => setAgreedConfirm(e.target.checked)}
              />
            }
            label="Tôi đồng ý với điều khoản thanh toán"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Hủy</Button>
          <Button
            variant="contained"
            disabled={!agreedConfirm || loadingCreate}
            onClick={handleConfirmPayment}
          >
            {loadingCreate ? "Đang xử lý..." : "Xác nhận"}
          </Button>
        </DialogActions>
      </Dialog> */}

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "background.paper",
            boxShadow: 8,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 800,
            color: "primary.main",
            py: 2,
          }}
        >
          Xác nhận thanh toán
        </DialogTitle>

        <DialogContent sx={{ px: 3, pt: 1 }}>
          <Typography sx={{ mb: 1.5, color: "text.primary" }}>
            Bạn có chắc muốn thanh toán khoản:
          </Typography>

          {/* fee details */}
          <Box
            sx={{
              borderRadius: 2,
              p: 2,
              mb: 2,
              background: "linear-gradient(135deg, rgba(14,165,233,0.06), rgba(2,132,199,0.04))",
              border: "1px solid",
              borderColor: "primary.light",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Tên khoản học phí
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {selectedFee?.description ?? "N/A"}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Số tiền
              </Typography>
              <Typography variant="h6" fontWeight={800} color="primary.dark">
                {typeof selectedFee?.amount === "number"
                  ? selectedFee.amount.toLocaleString() + " VND"
                  : "N/A"}
              </Typography>
            </Box>
          </Box>

          {/* checkbox (giữ nguyên state agreedConfirm) */}
          <FormControlLabel
            control={
              <Checkbox
                checked={agreedConfirm}
                onChange={(e) => setAgreedConfirm(e.target.checked)}
                sx={{ "&.Mui-checked": { color: "primary.main" } }}
              />
            }
            label={
              <Typography sx={{ fontSize: 14 }}>
                Tôi đồng ý với điều khoản thanh toán và xác nhận thông tin trên là chính xác
              </Typography>
            }
            sx={{
              mb: 0,
              pl: 0.5,
              alignItems: "flex-start",
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 1, justifyContent: "flex-end", gap: 1 }}>
          <Button
            onClick={() => setConfirmDialogOpen(false)}
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: 2, textTransform: "none", px: 3 }}
          >
            Hủy
          </Button>

          <Button
            variant="contained"
            onClick={handleConfirmPayment}
            disabled={!agreedConfirm || loadingCreate}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
              fontWeight: 700,
              background: (theme) =>
                !(!agreedConfirm || loadingCreate)
                  ? "linear-gradient(135deg,#1976d2,#0d47a1)"
                  : undefined,
            }}
          >
            {loadingCreate ? "Đang xử lý..." : "Xác nhận"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* --- Kết thúc thay thế --- */}




      {/* Giao diện OTP */}
      
      {/* <Dialog open={otpDialogOpen} onClose={() => setConfirmCloseOtp(true)} maxWidth="sm" fullWidth>
        <DialogTitle>Xác nhận thanh toán</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            Mã OTP đã được gửi đến email <b>{currentUser.email}</b>. Vui lòng kiểm tra hộp thư đến hoặc thư rác.
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Số tiền: {typeof otpStage?.amount === "number"
              ? otpStage.amount.toLocaleString() + " VND"
              : "N/A"}
          </Typography>

          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Nhập OTP"
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
          />

          {otpError && <Alert severity="error" sx={{ mt: 2 }}>{otpError}</Alert>}
          {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmCloseOtp(true)}>Hủy</Button>
          <Button
            variant="contained"
            disabled={loadingVerify}
            onClick={handleConfirmOtp}
          >
            {loadingVerify ? "Đang xác thực..." : "Xác nhận"}
          </Button>
        </DialogActions>
      </Dialog>

            <Dialog open={confirmCloseOtp} onClose={() => setConfirmCloseOtp(false)}>

        <DialogTitle>Xác nhận hủy thanh toán</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc muốn thoát khỏi bước xác thực OTP không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmCloseOtp(false)}>Không</Button>
          <Button
            color="error"
            onClick={() => {
              setConfirmCloseOtp(false);
              setOtpDialogOpen(false);
              setOtpStage(null);
              setOtpInput("");
              setAgreed(false);
              setOtpError("");

              // Đợi redis xử lí xong rồi mới cập nhật lại trạng thái học phí
              // Gọi lại 3 lần để đảm bảo Redis đã xử lý
              [5000, 10000, 15000].forEach((delay) => {
                setTimeout(() => {
                  // Chỉ gọi refetch nếu cần cập nhật trạng thái học phí
                  // Không bật loading nếu không có thay đổi
                  handleRefetchWithLoading(false);
                }, delay);
              });

            }}
          >
            Có, thoát
          </Button>
        </DialogActions>
      </Dialog> */}

      {/* --- Dialog nhập OTP --- */}
    {/* Giao diện OTP chuyên nghiệp */}
      <Dialog 
        open={otpDialogOpen} 
        onClose={() => setConfirmCloseOtp(true)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 2,
            background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: 700, color: "#1f2f98" }}>
          Xác nhận thanh toán
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary" sx={{ textAlign: "center", mb: 1 }}>
            Mã OTP đã được gửi đến email <b>{currentUser.email}</b>.<br />
            Vui lòng kiểm tra hộp thư đến hoặc thư rác.
          </Typography>

          <Typography sx={{ mt: 1, textAlign: "center", fontSize: "1rem" }}>
            <b>Số tiền:</b>{" "}
            {typeof otpStage?.amount === "number"
              ? otpStage.amount.toLocaleString() + " VND"
              : "N/A"}
          </Typography>

          {/* Ô nhập OTP dạng 6 số */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
            {[...Array(6)].map((_, index) => (
              <TextField
                key={index}
                id={`otp-${index}`}
                value={otpInput[index] || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // chỉ nhận số
                  if (!value) return;
                  const newOtp = Array.isArray(otpInput)
                    ? [...otpInput]
                    : otpInput.split("");
                  newOtp[index] = value.slice(-1);
                  setOtpInput(newOtp);

                  if (index < 5) {
                    const nextInput = document.getElementById(`otp-${index + 1}`);
                    if (nextInput) nextInput.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    const newOtp = Array.isArray(otpInput)
                      ? [...otpInput]
                      : otpInput.split("");

                    if (newOtp[index]) {
                      newOtp[index] = "";
                      setOtpInput(newOtp);
                    } else if (index > 0) {
                      const prevInput = document.getElementById(`otp-${index - 1}`);
                      if (prevInput) {
                        prevInput.focus();
                        const prevOtp = [...newOtp];
                        prevOtp[index - 1] = "";
                        setOtpInput(prevOtp);
                      }
                    }
                  }
                }}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "1.5rem",
                    width: "3rem",
                    height: "3rem",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                  },
                }}
              />
            ))}
          </Box>

          {/* Hiển thị lỗi / thành công */}
          {otpError && <Alert severity="error" sx={{ mt: 2 }}>{otpError}</Alert>}
          {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button 
            onClick={() => setConfirmCloseOtp(true)} 
            variant="outlined" 
            color="error"
            sx={{ borderRadius: "10px" }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: "10px",
              px: 3,
              background: "linear-gradient(135deg, #3a7bd5, #00d2ff)",
            }}
            disabled={loadingVerify}
            onClick={() => {
              const fullOtp = Array.isArray(otpInput) ? otpInput.join("") : otpInput;
              setOtpInput(fullOtp); // chuyển sang chuỗi để logic cũ hoạt động
              handleConfirmOtp();
            }}
          >
            {loadingVerify ? "Đang xác thực..." : "Xác nhận"}
          </Button>
        </DialogActions>
      </Dialog>


    {/* --- Dialog xác nhận thoát OTP --- */}
    <Dialog
      open={confirmCloseOtp}
      onClose={() => setConfirmCloseOtp(false)}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, boxShadow: 6 },
      }}
    >
      <DialogTitle
        sx={{ fontWeight: 700, color: "error.main", textAlign: "center" }}
      >
        Xác nhận hủy thanh toán
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", py: 2 }}>
        <Typography>
          Bạn có chắc muốn thoát khỏi bước xác thực OTP không?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={() => setConfirmCloseOtp(false)}
          variant="outlined"
          color="inherit"
          sx={{ borderRadius: 2, px: 3 }}
        >
          Không
        </Button>
        <Button
          color="error"
          variant="contained"
          sx={{ borderRadius: 2, px: 3 }}
          onClick={() => {
            setConfirmCloseOtp(false);
            setOtpDialogOpen(false);
            setOtpStage(null);
            setOtpInput("");
            setAgreed(false);
            setOtpError("");
            [5000, 10000, 15000].forEach((delay) => {
              setTimeout(() => handleRefetchWithLoading(false), delay);
            });
          }}
        >
          Có, thoát
        </Button>
      </DialogActions>
    </Dialog>


      <Backdrop
        open={loadingCreate || loadingVerify || isLoadingStatus || loadingSearch}
        sx={{ zIndex: 9999, color: "#fff", transition: "opacity 0.3s ease-in-out" }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>


    </Card>
  </Box>
);



}

