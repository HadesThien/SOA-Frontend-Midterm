import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactionApi";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function TransHistoryPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then((data) => setTransactions(data));
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lịch sử giao dịch
      </Typography>

      {transactions.length === 0 ? (
        <Typography>Chưa có giao dịch nào.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã giao dịch</TableCell>
                <TableCell>MSSV</TableCell>
                <TableCell>Tên sinh viên</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Số tiền</TableCell>
                <TableCell>Thời gian</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.id}</TableCell>
                  <TableCell>{t.studentId}</TableCell>
                  <TableCell>{t.fullname}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell>{t.amount.toLocaleString()} đ</TableCell>
                  <TableCell>{t.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
