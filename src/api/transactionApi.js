const BASE_URL = process.env.REACT_APP_API_URL;
export const getTransactions = async () => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${BASE_URL}/payments/history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Không thể lấy lịch sử giao dịch");
  }

  return await response.json();
};

export const addTransaction = async (tuitionId) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${BASE_URL}/payments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ tuition_id: tuitionId })
  });

  const data = await response.json();

  if (!response.ok || !data.payment_id) {
    // const errorData = await response.json();
    throw new Error(data.message || data.detail || "Không thể tạo giao dịch");
  }

  // return await response.json();
  return data;
};

export const getTransactionDetail = async (paymentId, userId) => {
  const token = localStorage.getItem("access_token"); // hoặc từ context

  const res = await fetch(`${BASE_URL}/payments/${paymentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": userId,
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Chi tiết lỗi:", errorText);
    throw new Error("Không thể lấy chi tiết giao dịch");
  }

  return await res.json();
};




// export const verifyTransactionReal = async ({ email, payment_id, otp }) => {
//   const token = localStorage.getItem("access_token");

//   const response = await fetch(`${BASE_URL}/payments/verify`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify({ email, payment_id, otp })
//   });

//   if (!response.ok) {
//   const errorData = await response.json();
//   const msg =
//     typeof errorData.detail === "string"
//       ? errorData.detail
//       : JSON.stringify(errorData.detail || errorData);

//   throw new Error(msg || "Xác thực giao dịch thất bại");
// }

//   return await response.json();
// };

export const verifyTransactionReal = async ({ email, payment_id, otp }) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${BASE_URL}/payments/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ email, payment_id, otp })
  });

  // Bắt lỗi rõ ràng nếu response không OK
  if (!response.ok) {
    let errorData = null;
    try {
      errorData = await response.json();
    } catch (e) {
      throw new Error("Không thể phân tích phản hồi từ server");
    }

    const msg =
      typeof errorData?.detail === "string"
        ? errorData.detail
        : JSON.stringify(errorData?.detail || errorData);

    throw new Error(msg || "Xác thực giao dịch thất bại");
  }

  // Kiểm tra phản hồi hợp lệ
  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error("Phản hồi không hợp lệ từ server");
  }

  if (!data || typeof data.message !== "string") {
    throw new Error("Phản hồi không chứa thông điệp xác thực");
  }

  return data;
};

