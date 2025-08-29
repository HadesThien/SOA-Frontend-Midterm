let transactions = []; // Giả lập DB trong bộ nhớ

/**
 * @name addTransaction
 * @description Lưu một giao dịch vào "database"
 */
export const addTransaction = (transaction) => {
  transactions.push({
    id: transactions.length + 1,
    ...transaction,
    date: new Date().toLocaleString(), // thêm ngày giờ
  });
};

/**
 * @name getTransactions
 * @description Lấy toàn bộ lịch sử giao dịch
 */
export const getTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 300);
  });
};
