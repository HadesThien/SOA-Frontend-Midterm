// import { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import { findUserByStudentId } from "../api/userApi";
// import { addTransaction, getTransactions } from "../api/transactionApi"; //  import thêm

// export default function PaymentPage({ currentUser }) {
//   const [studentId, setStudentId] = useState("");
//   const [targetUser, setTargetUser] = useState(null); // người được thanh toán hộ
//   const [error, setError] = useState("");
//   const [otpStage, setOtpStage] = useState(null); // khoản học phí đang cần OTP
//   const [otpInput, setOtpInput] = useState("");


//   const handleSearch = async () => {
//     try {
//       setError("");
//       const user = await findUserByStudentId(studentId);

//       // Lấy danh sách giao dịch đã trả
//       const trans = await getTransactions();

//       // Lọc học phí: nếu fee.id đã có trong trans => đánh dấu paid = true
//       const tuitionWithPaid = user.tuition.map((t) => {
//         const alreadyPaid = trans.some(
//           (tr) => tr.studentId === user.studentId && tr.description === t.title
//         );
//         return alreadyPaid ? { ...t, paid: true } : t;
//       });

//       setTargetUser({ ...user, tuition: tuitionWithPaid });
//     } catch (err) {
//       setTargetUser(null);
//       setError(err.message);
//     }
//   };
//   const handlePay = (fee) => {
//     if (currentUser.available_balance < fee.amount) {
//       setError("Số dư không đủ để thanh toán!");
//       return;
//     }
//     setError("");
//     setOtpStage(fee); // chuyển qua bước OTP
//   };

//   const handleConfirmOtp = () => {
//     if (otpInput === "123456") {
//       // ✅ Trừ số dư
//       currentUser.available_balance -= otpStage.amount;

//       // ✅ Đánh dấu học phí đã thanh toán
//       const updatedTuition = targetUser.tuition.map((t) =>
//         t.id === otpStage.id ? { ...t, paid: true } : t
//       );
//       setTargetUser({ ...targetUser, tuition: updatedTuition });

//       // ✅ Lưu giao dịch
//       addTransaction({
//         studentId: targetUser.studentId,
//         feeId: otpStage.id,
//         fullname: targetUser.fullname,
//         amount: otpStage.amount,
//         description: otpStage.title,
//         payer: currentUser.fullname,
//       });

//       alert(`Thanh toán thành công cho khoản ${otpStage.title}!`);

//       // Reset OTP stage
//       setOtpStage(null);
//       setOtpInput("");
//     } else {
//       setError("Mã OTP không chính xác!");
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" gutterBottom>
//         Thanh toán học phí
//       </Typography>

//       {/* Ô tìm MSSV */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         <TextField
//           label="Mã số sinh viên"
//           value={studentId}
//           onChange={(e) => setStudentId(e.target.value)}
//         />
//         <Button variant="contained" onClick={handleSearch}>
//           Tìm
//         </Button>
//       </Box>

//       {error && (
//         <Typography color="error" sx={{ mb: 2 }}>
//           {error}
//         </Typography>
//       )}

//       {/* Nếu tìm thấy sinh viên */}
//       {targetUser && (
//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h6">Thông tin sinh viên</Typography>
//             <Typography>MSSV: {targetUser.studentId}</Typography>
//             <Typography>Họ tên: {targetUser.fullname}</Typography>
//             <Typography>
//               Số dư khả dụng của bạn:{" "}
//               {currentUser.available_balance.toLocaleString()} VND
//             </Typography>

//             <Typography variant="h6" sx={{ mt: 2 }}>
//               Các khoản học phí chưa thanh toán
//             </Typography>
//             <List>
//               {targetUser.tuition
//                 .filter((t) => !t.paid)
//                 .map((t) => (
//                   <ListItem
//                     key={t.id}
//                     secondaryAction={
//                       <Button variant="contained" onClick={() => handlePay(t)}>
//                         Thanh toán
//                       </Button>
//                     }
//                   >
//                     <ListItemText
//                       primary={t.title}
//                       secondary={`Số tiền: ${t.amount.toLocaleString()} VND`}
//                     />
//                   </ListItem>
//                 ))}
//             </List>
//           </CardContent>
//         </Card>
//       )}

//       {/* Form nhập OTP */}
//       {otpStage && (
//         <Card>
//           <CardContent>
//             <Typography variant="h6">
//               Nhập mã OTP để thanh toán: {otpStage.title}
//             </Typography>
//             <TextField
//               label="Mã OTP (demo: 123456)"
//               value={otpInput}
//               onChange={(e) => setOtpInput(e.target.value)}
//               sx={{ mt: 2, mr: 2 }}
//             />
//             <Button variant="contained" onClick={handleConfirmOtp}>
//               Xác nhận
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   );
// }
import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Alert,
  Snackbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { findUserByStudentId } from "../api/userApi";
import { addTransaction, getTransactions } from "../api/transactionApi";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import SearchIcon from '@mui/icons-material/Search';
import PaymentIcon from '@mui/icons-material/Payment';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

export default function PaymentPage({ currentUser }) {
  const [studentId, setStudentId] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [error, setError] = useState("");
  const [otpStage, setOtpStage] = useState(null);
  const [otpInput, setOtpInput] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSearch = async () => {
    try {
      setError("");
      const user = await findUserByStudentId(studentId);
      const trans = await getTransactions();

      const tuitionWithPaid = user.tuition.map((t) => {
        const alreadyPaid = trans.some(
          (tr) => tr.studentId === user.studentId && tr.description === t.title
        );
        return alreadyPaid ? { ...t, paid: true } : t;
      });

      setTargetUser({ ...user, tuition: tuitionWithPaid });
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
    setOtpStage(fee);
  };

  const handleConfirmOtp = () => {
    if (otpInput === "123456") {
      currentUser.available_balance -= otpStage.amount;

      const updatedTuition = targetUser.tuition.map((t) =>
        t.id === otpStage.id ? { ...t, paid: true } : t
      );
      setTargetUser({ ...targetUser, tuition: updatedTuition });

      addTransaction({
        studentId: targetUser.studentId,
        feeId: otpStage.id,
        fullname: targetUser.fullname,
        amount: otpStage.amount,
        description: otpStage.title,
        payer: currentUser.fullname,
      });

      setSuccessMsg(`Thanh toán thành công cho khoản ${otpStage.title}!`);
      setOtpStage(null);
      setOtpInput("");
      setAgreed(false);
    } else {
      setError("Mã OTP không chính xác!");
    }
  };

  const unpaidFees = targetUser?.tuition?.filter((t) => !t.paid) || [];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Thanh toán học phí
      </Typography>

      {/* Thông tin người thanh toán */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
         <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
           <AccountCircleSharpIcon color="action" />
           Thông tin người thanh toán
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Họ tên"
              value={currentUser.fullname}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Số điện thoại"
              value={currentUser.phone}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Số dư tài khoản"
              value={currentUser.available_balance.toLocaleString() + " VND"}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Tra cứu học phí */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SearchIcon color="action"/>
          Tra cứu học phí
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              label="Mã số sinh viên"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSearch}
            >
              Tìm
            </Button>
          </Grid>
        </Grid>

        {targetUser && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography>MSSV: {targetUser.studentId}</Typography>
            <Typography>Họ tên sinh viên: {targetUser.fullname}</Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Danh sách khoản học phí:
            </Typography>
            <List>
              {unpaidFees.length > 0 ? (
                unpaidFees.map((fee) => (
                  <ListItem key={fee.id} divider>
                    <ListItemText
                      primary={`${fee.title}`}
                      secondary={`Số tiền: ${fee.amount.toLocaleString()} VND`}
                    />
                    <ListItemSecondaryAction>
                      <Button
                        variant="contained"
                        onClick={() => handlePay(fee)}
                      >
                        Thanh toán
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <Typography 
                  sx={{ 
                    mt: 2, 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1, 
                    color: "green", 
                    fontWeight: "bold" 
                  }} 
                  gutterBottom
                >
                  <DoneOutlinedIcon sx={{ color: "green" }} />
                  Sinh viên này đã hoàn tất học phí.
                </Typography>


              )}
            </List>
          </Box>
        )}
      </Paper>

      {/* Xác thực OTP */}
      {otpStage && !successMsg && (
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PaymentIcon color="action"/>
            Xác thực OTP
          </Typography>
          <Typography>
            Khoản thanh toán:{" "}
            <strong>
              {otpStage.title} - {otpStage.amount.toLocaleString()} VND
            </strong>
          </Typography>
          <Typography>
            Số dư của bạn:{" "}
            <strong>
               {currentUser.available_balance.toLocaleString()} VND
            </strong>
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
            }
            label="Tôi đồng ý với điều khoản sử dụng"
            sx={{ mt: 2 }}
          />

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={8}>
              <TextField
                label="Nhập mã OTP"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                disabled={!agreed}
                onClick={handleConfirmOtp}
              >
                Xác nhận cuối cùng
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Thông báo lỗi */}
      {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}

      {/* Thông báo thành công */}
      <Snackbar
        open={!!successMsg}
        autoHideDuration={4000}
        onClose={() => setSuccessMsg("")}
      >
        <Alert severity="success" onClose={() => setSuccessMsg("")}>
          {successMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

