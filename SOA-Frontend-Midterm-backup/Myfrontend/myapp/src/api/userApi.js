const BASE_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (username, password) => {
  try{
    const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
      // console.log(BASE_URL)
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Lỗi đăng nhập:", errorData);
        throw new Error(errorData.detail || "Đăng nhập thất bại");
      }

      const data = await response.json();
      // console.log(data)
      // Lưu token vào localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      return data;
  }catch(err){
    console.error("Lỗi đăng nhập:", err);
    throw err;
  }
  
};

export const getCurrentUser = async () => {
  // const access_token = localStorage.getItem("access_token");

  // const response = await fetch(`${BASE_URL}/users/me`, {
  //   headers: {
  //     Authorization: `Bearer ${access_token}`
  //   }
  // });

  // if (!response.ok) {
  //   throw new Error("Không thể lấy thông tin người dùng");
  // }

  // return await response.json();

  try {
    const access_token = localStorage.getItem("access_token");
    
    if (!access_token) {
      //chưa có access token
      throw new Error("Không tìm thấy sinh viên này");
    }

    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Lỗi khi gọi /users/me:", errorData);
      throw new Error(errorData.detail || "Không thể lấy thông tin người dùng");
    }

    const userData = await response.json();
    return userData;

    // return await response.json();
  } catch (err) {
    console.error("Lỗi khi lấy thông tin người dùng:", err);
    throw err;
  }
  
};
