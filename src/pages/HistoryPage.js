import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { getPaymentHistory } from '../api/tuitionApi';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

/**
 * @name HistoryPage
 * @description Page component to display payment history.
 */
const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      const data = await getPaymentHistory();
      setHistory(data);
      setIsLoading(false);
    };
    fetchHistory();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lịch sử thanh toán
      </Typography>
      <StyledCard>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã giao dịch</TableCell>
                  <TableCell>Mã học phí</TableCell>
                  <TableCell>Tên học phí</TableCell>
                  <TableCell align="right">Số tiền</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày thanh toán</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : history.length > 0 ? (
                  history.map((item) => (
                    <TableRow key={item.payment_id}>
                      <TableCell>{item.payment_id}</TableCell>
                      <TableCell>{item.tuition_id}</TableCell>
                      <TableCell>{item.tuitionName}</TableCell>
                      <TableCell align="right">{item.amount.toLocaleString('vi-VN')} VNĐ</TableCell>
                      <TableCell>
                        <Alert severity="success" icon={false} sx={{ py: 0, px: 1 }}>
                          {item.status}
                        </Alert>
                      </TableCell>
                      <TableCell>{item.payment_date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1" color="text.secondary">
                        Không có lịch sử thanh toán nào.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default HistoryPage;
