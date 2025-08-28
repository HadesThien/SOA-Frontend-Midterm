import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { getTuitionByStudentId, sendOtp, processPayment } from '../../api/tuitionApi';
import CustomAlert from '../common/CustomAlert';

/**
 * @name PaymentForm
 * @description Component containing the tuition payment form.
 * @param {object} props - Component props.
 * @param {object} props.user - The logged-in user object.
 * @param {object} props.tuitionInfo - Optional tuition information to pre-fill the form.
 * @param {function} props.onPaymentSuccess - Callback function after a successful payment.
 */
const PaymentForm = ({ user, tuitionInfo, onPaymentSuccess }) => {
  const [studentId, setStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  // Use useEffect to handle pre-filling the form if tuitionInfo is provided
  useEffect(() => {
    if (tuitionInfo) {
      setStudentId(tuitionInfo.student_id);
      setStudentDetails({
        student_id: tuitionInfo.student_id,
        fullname: 'Lê Thị B', // Mock student name since it's not in the tuition mock data
        tuition_fee: tuitionInfo.amount,
      });
    }
  }, [tuitionInfo]);

  const handleStudentIdChange = async (e) => {
    const id = e.target.value;
    setStudentId(id);
    setStudentDetails(null);
    if (id.length > 0) {
      setIsLoading(true);
      try {
        const student = await getTuitionByStudentId(id);
        setStudentDetails(student);
      } catch (err) {
        setAlert({ open: true, message: err.message, severity: 'error' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    setAlert({ open: false, message: '', severity: 'success' });
    try {
      await sendOtp(user.email);
      setIsOtpSent(true);
      setAlert({ open: true, message: 'Mã OTP đã được gửi đến email của bạn.', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err.message, severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    setAlert({ open: false, message: '', severity: 'success' });
    try {
      const paymentDetails = {
        user_id: user.username,
        tuition_id: tuitionInfo ? tuitionInfo.id : 'N/A',
        tuition_fee: studentDetails.tuition_fee,
        available_balance: user.available_balance,
      };
      const result = await processPayment(paymentDetails, otp);
      setAlert({ open: true, message: result.message, severity: 'success' });
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    } catch (err) {
      setAlert({ open: true, message: err.message, severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = studentId.length > 0 && studentDetails !== null;
  const isOtpValid = otp.length === 6;

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Form Thanh toán Học phí
      </Typography>

      {/* Section 1: Thông tin người thanh toán */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Thông tin người thanh toán
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                value={user.fullname}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={user.phone}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={user.email}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Section 2: Thông tin học phí */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Thông tin học phí
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mã sinh viên"
                value={studentId}
                onChange={handleStudentIdChange}
                disabled={!!tuitionInfo} // Disable if tuitionInfo prop is present
              />
            </Grid>
            {isLoading && !studentDetails && (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, width: '100%' }}>
                <CircularProgress />
              </Box>
            )}
            {studentDetails && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Họ và tên sinh viên"
                    value={studentDetails?.fullname || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tổng số học phí cần phải trả"
                    value={studentDetails?.tuition_fee ? `${studentDetails.tuition_fee.toLocaleString('vi-VN')} VNĐ` : ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Section 3: Thông tin thanh toán */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Thông tin thanh toán
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số dư khả dụng"
                value={`${user.available_balance.toLocaleString('vi-VN')} VNĐ`}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số học phí cần thanh toán"
                value={studentDetails?.tuition_fee ? `${studentDetails.tuition_fee.toLocaleString('vi-VN')} VNĐ` : ''}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Nút xác nhận thanh toán */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        {!isOtpSent && (
          <Button
            variant="contained"
            disabled={!isFormValid || isLoading || (user.available_balance < (studentDetails?.tuition_fee || 0))}
            onClick={handleSendOtp}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Xác nhận thanh toán'}
          </Button>
        )}
      </Box>

      {/* Form xác thực OTP */}
      {isOtpSent && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1" gutterBottom>
            Vui lòng nhập mã OTP đã được gửi tới email của bạn.
          </Typography>
          <TextField
            margin="normal"
            required
            id="otp"
            label="Mã OTP"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ ml: 2, mt: 2 }}
            disabled={!isOtpValid || isLoading}
            onClick={handlePayment}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Xác nhận'}
          </Button>
        </Box>
      )}

      {/* Custom Alert */}
      <CustomAlert open={alert.open} message={alert.message} severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })} />
    </Box>
  );
};

export default PaymentForm;
