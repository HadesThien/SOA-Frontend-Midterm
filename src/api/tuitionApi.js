
// const mockStudents = [
//   { student_id: '123456', fullname: 'Lê Thị B', tuition_fee: 5000000 },
//   { student_id: '654321', fullname: 'Trần Văn C', tuition_fee: 7500000 },
// ];

// const mockUnpaidTuitions = [
//   {
//     id: 'TDTU_2024_01',
//     tuitionName: 'Học phí kỳ 2 năm 2024',
//     amount: 5000000,
//     status: 'NOT_YET_PAID',
//     description: 'Học phí các môn học và lệ phí thư viện.',
//     expires_at: '2024-12-31',
//     student_id: '123456'
//   },
//   {
//     id: 'TDTU_2024_02',
//     tuitionName: 'Học phí ngoại ngữ',
//     amount: 2500000,
//     status: 'NOT_YET_PAID',
//     description: 'Học phí các lớp ngoại ngữ tự chọn.',
//     expires_at: '2025-01-15',
//     student_id: '123456'
//   }
// ];

// const mockPaymentHistory = [
//   {
//     payment_id: 'PAY_001',
//     tuition_id: 'TDTU_2023_01',
//     tuitionName: 'Học phí kỳ 1 năm 2023',
//     amount: 4500000,
//     status: 'Hoàn tất',
//     payment_date: '2023-09-05',
//   },
//   {
//     payment_id: 'PAY_002',
//     tuition_id: 'TDTU_2023_02',
//     tuitionName: 'Học phí kỳ 2 năm 2023',
//     amount: 5000000,
//     status: 'Hoàn tất',
//     payment_date: '2024-03-10',
//   },
// ];

// /**
//  * @name getTuitionByStudentId
//  * @description Mocks a backend API call to get tuition information for a student.
//  * @param {string} studentId - The student's ID.
//  * @returns {Promise<object>} A promise that resolves with the student's tuition data or rejects with an error.
//  */
// export const getTuitionByStudentId = (studentId) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const student = mockStudents.find((s) => s.student_id === studentId);
//       if (student) {
//         resolve(student);
//       } else {
//         reject(new Error('Mã sinh viên không tồn tại.'));
//       }
//     }, 500); // Simulate network delay
//   });
// };

// /**
//  * @name sendOtp
//  * @description Mocks a backend API call to send an OTP to the user's email.
//  * @param {string} email - The user's email.
//  * @returns {Promise<void>} A promise that resolves on success or rejects on error.
//  */
// export const sendOtp = (email) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(`Mã OTP đã được gửi tới email: ${email}`);
//       resolve();
//     }, 1000); // Simulate network delay
//   });
// };

// /**
//  * @name processPayment
//  * @description Mocks a backend API call to process a payment with OTP verification.
//  * @param {object} paymentDetails - Details of the payment.
//  * @param {string} otp - The OTP entered by the user.
//  * @returns {Promise<object>} A promise that resolves with the transaction result or rejects with an error.
//  */
// export const processPayment = (paymentDetails, otp) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (otp === '123456') {
//         if (paymentDetails.available_balance < paymentDetails.tuition_fee) {
//           reject(new Error('Số dư khả dụng không đủ.'));
//         } else {
//           resolve({
//             status: 'success',
//             message: 'Thanh toán học phí thành công!',
//             new_balance: paymentDetails.available_balance - paymentDetails.tuition_fee,
//           });
//         }
//       } else {
//         reject(new Error('Mã OTP không chính xác hoặc đã hết hạn.'));
//       }
//     }, 1500); // Simulate network delay
//   });
// };

// /**
//  * @name getUnpaidTuitions
//  * @description Mocks a backend API call to get a list of unpaid tuitions.
//  * @returns {Promise<Array<object>>} A promise that resolves with a list of unpaid tuition fees.
//  */
// export const getUnpaidTuitions = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockUnpaidTuitions);
//     }, 500);
//   });
// };

// /**
//  * @name getPaymentHistory
//  * @description Mocks a backend API call to get a list of payment history.
//  * @returns {Promise<Array<object>>} A promise that resolves with a list of payment history.
//  */
// export const getPaymentHistory = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockPaymentHistory);
//     }, 500);
//   });
// };

// This file contains mock API calls for tuition and payment operations.
// In a real application, these would be `fetch` or `axios` calls to a backend server.

const mockStudents = [
  { student_id: '123456', fullname: 'Lê Thị B', tuition_fee: 5000000 },
  { student_id: '654321', fullname: 'Trần Văn C', tuition_fee: 7500000 },
];

const mockUnpaidTuitions = [
  {
    id: 'TDTU_2024_01',
    tuitionName: 'Học phí kỳ 2 năm 2024',
    amount: 5000000,
    status: 'NOT_YET_PAID',
    description: 'Học phí các môn học và lệ phí thư viện.',
    expires_at: '2024-12-31',
    student_id: '123456'
  },
  {
    id: 'TDTU_2024_02',
    tuitionName: 'Học phí ngoại ngữ',
    amount: 2500000,
    status: 'NOT_YET_PAID',
    description: 'Học phí các lớp ngoại ngữ tự chọn.',
    expires_at: '2025-01-15',
    student_id: '123456'
  },
  {
    id: 'TDTU_2024_03',
    tuitionName: 'Học phí kỳ 2 năm 2024',
    amount: 7500000,
    status: 'NOT_YET_PAID',
    description: 'Học phí các môn học và lệ phí thư viện.',
    expires_at: '2024-12-31',
    student_id: '654321'
  },
];

const mockPaymentHistory = [
  {
    payment_id: 'PAY_001',
    tuition_id: 'TDTU_2023_01',
    tuitionName: 'Học phí kỳ 1 năm 2023',
    amount: 4500000,
    status: 'Hoàn tất',
    payment_date: '2023-09-05',
  },
  {
    payment_id: 'PAY_002',
    tuition_id: 'TDTU_2023_02',
    tuitionName: 'Học phí kỳ 2 năm 2023',
    amount: 5000000,
    status: 'Hoàn tất',
    payment_date: '2024-03-10',
  },
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
      if (otp === '123456') {
        if (paymentDetails.available_balance < paymentDetails.tuition_fee) {
          reject(new Error('Số dư khả dụng không đủ.'));
        } else {
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

/**
 * @name getUnpaidTuitions
 * @description Mocks a backend API call to get a list of unpaid tuitions.
 * @returns {Promise<Array<object>>} A promise that resolves with a list of unpaid tuition fees.
 */
export const getUnpaidTuitions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUnpaidTuitions);
    }, 500);
  });
};

/**
 * @name getUnpaidTuitionsByStudentId
 * @description Mocks a backend API call to get unpaid tuitions for a specific student.
 * @param {string} studentId - The student's ID to search for.
 * @returns {Promise<Array<object>>} A promise that resolves with the list of unpaid tuition fees for the given student.
 */
export const getUnpaidTuitionsByStudentId = (studentId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tuitions = mockUnpaidTuitions.filter(tuition => tuition.student_id === studentId);
      if (tuitions.length > 0) {
        resolve(tuitions);
      } else {
        reject(new Error('Không tìm thấy học phí cho mã sinh viên này.'));
      }
    }, 500); // Simulate network delay
  });
};

/**
 * @name getPaymentHistory
 * @description Mocks a backend API call to get a list of payment history.
 * @returns {Promise<Array<object>>} A promise that resolves with a list of payment history.
 */
export const getPaymentHistory = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPaymentHistory);
    }, 500);
  });
};
