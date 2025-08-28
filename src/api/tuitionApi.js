


const mockStudents = [
  { student_id: '123456', fullname: 'Lê Thị B', tuition_fee: 5000000 },
  { student_id: '654321', fullname: 'Trần Văn C', tuition_fee: 7500000 },
];

/**
 * @name getTuitionByStudentId
 * @description Mocks a backend API call to get tuition information for a student.
 * @param {string} studentId - The student's ID.
 * @returns {Promise<object>} A promise that resolves with the student's tuition data or rejects with an error.
 */
export const getTuitionByStudentId = (studentId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const student = mockStudents.find((s) => s.student_id === studentId);
      if (student) {
        resolve(student);
      } else {
        reject(new Error('Mã sinh viên không tồn tại.'));
      }
    }, 500); // Simulate network delay
  });
};

/**
 * @name sendOtp
 * @description Mocks a backend API call to send an OTP to the user's email.
 * @param {string} email - The user's email.
 * @returns {Promise<void>} A promise that resolves on success or rejects on error.
 */
export const sendOtp = (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real scenario, we would send a request to a backend service to dispatch an email.
      console.log(`Mã OTP đã được gửi tới email: ${email}`);
      resolve();
    }, 1000); // Simulate network delay
  });
};

/**
 * @name processPayment
 * @description Mocks a backend API call to process a payment with OTP verification.
 * @param {object} paymentDetails - Details of the payment.
 * @param {string} otp - The OTP entered by the user.
 * @returns {Promise<object>} A promise that resolves with the transaction result or rejects with an error.
 */
export const processPayment = (paymentDetails, otp) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For a mock, assume OTP is always "123456" for success
      if (otp === '123456') {
        if (paymentDetails.available_balance < paymentDetails.tuition_fee) {
          reject(new Error('Số dư khả dụng không đủ.'));
        } else {
          // Simulate a successful transaction
          resolve({
            status: 'success',
            message: 'Thanh toán học phí thành công!',
            new_balance: paymentDetails.available_balance - paymentDetails.tuition_fee,
          });
        }
      } else {
        reject(new Error('Mã OTP không chính xác hoặc đã hết hạn.'));
      }
    }, 1500); // Simulate network delay
  });
};
