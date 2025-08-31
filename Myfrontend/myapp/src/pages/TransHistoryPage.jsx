// import { useEffect, useState } from "react";
// import { getTransactions } from "../api/transactionApi";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// export default function TransHistoryPage({ currentUser }) {
//   const [transactions, setTransactions] = useState([]);

//   // useEffect(() => {
//   //   getTransactions().then((data) => setTransactions(data));
//   // }, []);

//   useEffect(() => {
//     if (currentUser) {
//       // getTransactions(currentUser.studentId).then((data) => {
//           getTransactions({ payer: currentUser.fullname }).then((data) => {
//         setTransactions(data);
//       });
//     }
//   }, [currentUser]);

//   return (
//     <Box>
//       <Typography variant="h5" gutterBottom>
//         Lịch sử giao dịch
//       </Typography>

//       {transactions.length === 0 ? (
//         <Typography>Chưa có giao dịch nào.</Typography>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Mã giao dịch</TableCell>
//                 <TableCell>MSSV</TableCell>
//                 <TableCell>Tên sinh viên</TableCell>
//                 <TableCell>Mô tả</TableCell>
//                 <TableCell>Số tiền</TableCell>
//                 <TableCell>Thời gian</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {transactions.map((t) => (
//                 <TableRow key={t.id}>
//                   <TableCell>{t.id}</TableCell>
//                   <TableCell>{t.studentId}</TableCell>
//                   <TableCell>{t.fullname}</TableCell>
//                   <TableCell>{t.description}</TableCell>
//                   <TableCell>{t.amount.toLocaleString()} đ</TableCell>
//                   <TableCell>{t.date}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }
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

export default function TransHistoryPage({ currentUser }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getTransactions({ payer: currentUser.fullname }).then((data) => {
        setTransactions(data);
      });
    }
  }, [currentUser]);

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
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Mã giao dịch</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>MSSV</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tên sinh viên</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Mô tả</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Số tiền</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Thời gian</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((t) => (
                <TableRow 
                  key={t.id} 
                  hover
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
                >
                  <TableCell>{t.id}</TableCell>
                  <TableCell>{t.studentId}</TableCell>
                  <TableCell>{t.fullname}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold", color: "green" }}>
                    {t.amount.toLocaleString()} đ
                  </TableCell>
                  {/* <TableCell>
                    {new Date(t.date).toLocaleString("vi-VN")}
                  </TableCell> */}
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
