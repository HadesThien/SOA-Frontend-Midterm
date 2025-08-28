import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getUnpaidTuitions, getUnpaidTuitionsByStudentId } from '../api/tuitionApi';
import PaymentForm from '../components/payment/PaymentForm';
import CustomAlert from '../components/common/CustomAlert';

/**
 * @name TuitionPage
 * @description Page component to display unpaid tuitions and the payment form.
 * @param {object} props - Component props.
 * @param {object} props.user - The logged-in user object.
 */
const TuitionPage = ({ user }) => {
  const [unpaidTuitions, setUnpaidTuitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentIdSearch, setStudentIdSearch] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  // Function to fetch all unpaid tuitions initially
  const fetchAllTuitions = async () => {
    setIsLoading(true);
    try {
      const data = await getUnpaidTuitions();
      setUnpaidTuitions(data);
    } catch (err) {
      setAlert({ open: true, message: 'Không thể tải danh sách học phí.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTuitions();
  }, []);

  const handleSearch = async () => {
    if (!studentIdSearch) {
      setAlert({ open: true, message: 'Vui lòng nhập mã sinh viên.', severity: 'warning' });
      return;
    }
    setIsSearchLoading(true);
    try {
      const data = await getUnpaidTuitionsByStudentId(studentIdSearch);
      setUnpaidTuitions(data);
    } catch (err) {
      setAlert({ open: true, message: err.message, severity: 'error' });
      setUnpaidTuitions([]); // Clear list on error
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleOpenModal = (tuition) => {
    setSelectedTuition(tuition);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTuition(null);
    // Refresh the tuition list after a payment is made.
    fetchAllTuitions();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Học phí cần thanh toán
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <TextField
          label="Tìm kiếm theo mã sinh viên"
          variant="outlined"
          value={studentIdSearch}
          onChange={(e) => setStudentIdSearch(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" onClick={handleSearch} disabled={isSearchLoading}>
          {isSearchLoading ? <CircularProgress size={24} /> : 'Tìm kiếm'}
        </Button>
        <Button variant="outlined" onClick={fetchAllTuitions}>
          Tải lại danh sách
        </Button>
      </Box>

      {/* Tuition List */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên học phí</TableCell>
              <TableCell>Mã sinh viên</TableCell>
              <TableCell align="right">Số tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày hết hạn</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : unpaidTuitions.length > 0 ? (
              unpaidTuitions.map((tuition) => (
                <TableRow key={tuition.id}>
                  <TableCell>{tuition.id}</TableCell>
                  <TableCell>{tuition.tuitionName}</TableCell>
                  <TableCell>{tuition.student_id}</TableCell>
                  <TableCell align="right">{tuition.amount.toLocaleString('vi-VN')} VNĐ</TableCell>
                  <TableCell>
                    <Alert severity="warning" icon={false} sx={{ py: 0, px: 1 }}>
                      {tuition.status === 'NOT_YET_PAID' ? 'Chưa thanh toán' : tuition.status}
                    </Alert>
                  </TableCell>
                  <TableCell>{tuition.expires_at}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(tuition)}
                    >
                      Thanh toán
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Không có học phí cần thanh toán.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payment Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Thanh toán học phí</Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedTuition && (
            <PaymentForm
              user={user}
              tuitionInfo={selectedTuition}
              onPaymentSuccess={handleCloseModal}
            />
          )}
        </DialogContent>
      </Dialog>
      <CustomAlert open={alert.open} message={alert.message} severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })} />
    </Box>
  );
};

export default TuitionPage;
