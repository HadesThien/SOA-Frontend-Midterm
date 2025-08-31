let transactions = []; // Giả lập DB trong bộ nhớ

/**
 * @name addTransaction
 * @description Lưu một giao dịch vào "database"
 */
export const addTransaction = (transaction) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      transactions.push({
        ...transaction,
        id: transactions.length + 1,
        date: new Date().toLocaleString("vi-VN"), // thêm ngày giờ
      });
      resolve(true);
    }, 300);
  });
};

/**
 * @name getTransactions
 * @description Lấy lịch sử giao dịch theo studentId (nếu có)
 */
export const getTransactions = ({studentId = null, payer = null}= {})  => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // if (studentId) {
      //   resolve(transactions.filter(t => t.studentId === studentId));
      // } else {
      //   resolve(transactions);
      // }
       let filtered = transactions; 
      if (studentId) {
        filtered = filtered.filter((t) => t.studentId === studentId);
      }
      if (payer) {
        filtered = filtered.filter((t) => t.payer === payer);
      }
      resolve(filtered);
    }, 300);
  });
};
