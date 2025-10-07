import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactionApi";
import { getTransactionDetail } from "../api/transactionApi";

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";


export default function TransHistoryPage({ currentUser }) {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      getTransactions()
        .then((data) => {
          if (Array.isArray(data)) {
            // setTransactions(data);
            const successful = data.filter((t) => t.status === "SUCCESS");
            setTransactions(successful);
          } else {
            setTransactions([]); // fallback nếu không phải mảng
          }
        })
        .catch((err) => {
          console.error("Lỗi khi lấy giao dịch:", err);
          setTransactions([]); // fallback khi lỗi
        });
    }
  }, [currentUser]);

  const translateStatus = (status) => {
  switch (status) {
    case "PAID":
      return "Đã thanh toán";
    case "NOT_YET_PAID":
      return "Chưa thanh toán";
    case "PENDING":
      return "Đang xử lý";
    case "CANCELLED":
      return "Đã hủy";
    default:
      return "Không xác định";
  }
};


  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Lịch sử giao dịch
      </Typography>

      {transactions.length === 0 ? (
        <Typography color="text.secondary">
          Chưa có giao dịch nào.
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ borderRadius: 3, overflow: "hidden" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold", minWidth: 120 }}>Mã giao dịch</TableCell>
                {/* <TableCell sx={{ color: "white", fontWeight: "bold" }}>Mô tả</TableCell> */}
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold", minWidth: 120 }}>Số tiền</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold", minWidth: 160 }}>Thời gian</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold", minWidth: 160 }}>Chi tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((t) => (
                <TableRow 
                  key={t.id} 
                  hover
                  // sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
                >
                  <TableCell align="center">{t.id}</TableCell>
                  {/* <TableCell>{t.studentId}</TableCell>
                  <TableCell>{t.fullname}</TableCell>
                  <TableCell>{t.description}</TableCell> */}
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "green" }}>
                    {t.amount.toLocaleString()} đ
                  </TableCell>
                  {/* <TableCell>
                    {new Date(t.date).toLocaleString("vi-VN")}
                  </TableCell> */}
                  <TableCell align= "center">{new Date(t.date).toLocaleString("vi-VN")}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      // onClick={() => {
                      //   setSelectedTransaction(t);
                      //   setDetailOpen(true);
                      // }}
                      // sx={{
                      //   bgcolor: "#d32f2f",
                      //   color: "white",
                      //   fontWeight: "bold",
                      //   textTransform: "none",
                      //   px: 2,
                      //   py: 0.5,
                      //   borderRadius: 2,
                      //   "&:hover": { 
                      //     bgcolor: "#b71c1c" ,
                      //   }
                      // }}

                      onClick={async () => {
                        if (!currentUser?.id) {
                          console.warn("Thiếu user ID, không thể lấy chi tiết giao dịch");
                          return;
                        }

                        try {
                          console.log("Gửi yêu cầu lấy chi tiết với user ID:", currentUser.id);
                          const detail = await getTransactionDetail(t.id, currentUser.id);
                          console.log("Chi tiết giao dịch nhận được:", detail);

                          setSelectedTransaction({ ...t, ...detail }); // gộp dữ liệu
                          setDetailOpen(true);
                        } catch (err) {
                          console.error("Lỗi khi lấy chi tiết:", err);
                        }
                      }}
                      sx={{
                        bgcolor: "#d32f2f",
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "none",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        "&:hover": { 
                          bgcolor: "#b71c1c" ,
                        }
                      }}



                    >
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog open={detailOpen} onClose={() => setDetailOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle fontWeight="bold">Chi tiết giao dịch</DialogTitle>
            <DialogContent dividers>
              {selectedTransaction && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {/* <Typography><strong>Người thực hiện:</strong> {selectedTransaction.fullname}</Typography> */}
                  <Typography><strong>MSSV chủ khoản học phí:</strong> {selectedTransaction.tuition_of}</Typography>
                  {/* <Typography><strong>Tên chủ khoản học phí:</strong> {selectedTransaction.ownerName || "Không rõ"}</Typography> */}
                  <Divider sx={{ my: 2 }} />
                  {/* <Typography><strong>Mô tả:</strong> {selectedTransaction.description}</Typography> */}
                  <Typography><strong>Số tiền:</strong> {selectedTransaction.amount.toLocaleString()} đ</Typography>
                  <Typography><strong>Thời gian:</strong> {new Date(selectedTransaction.date).toLocaleString("vi-VN")}</Typography>
                  {/* <Typography><strong>Trạng thái học phí:</strong> {selectedTransaction.tuition_status}</Typography> */}
                  <Typography>
                  <strong>Trạng thái học phí:</strong> {translateStatus(selectedTransaction.tuition_status)}
                </Typography>


                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ pr: 3, pb: 2 }}>
              <Button 
                onClick={() => setDetailOpen(false)}
                variant="outlined"
                sx={{
                  borderColor: "#d32f2f",
                  color: "#d32f2f",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#fbe9e7",
                    borderColor: "#b71c1c",
                    color: "#b71c1c",
                  }
                }}
                >
                  Đóng
              </Button>
            </DialogActions>
          </Dialog>


        </TableContainer>
        
      )}
    </Box>
  );
}
