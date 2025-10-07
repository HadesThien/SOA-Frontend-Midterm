
const mockUsers = [
  {
    username: 'user01',
    password: 'password123',
    fullname: 'Nguyễn Văn A',
    phone: '0987654321',
    email: 'nguyenvana@example.com',
    available_balance: 15000000,
  },
];

/**
 * @name loginUser
 * @description Mocks a backend API call to log in a user.
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} A promise that resolves with the user data or rejects with an error.
 */
export const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Tên đăng nhập hoặc mật khẩu không chính xác.'));
      }
    }, 500); // Simulate network delay
  });
};
