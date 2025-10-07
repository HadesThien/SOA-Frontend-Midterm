const BASE_URL = process.env.REACT_APP_API_URL;
export const getMyTuitions = async () => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${BASE_URL}/tuitions/me`,  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách học phí");
  }

  return await response.json(); // { total, tuitions }
};

export const getTuitionsByStudentId = async (studentId) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${BASE_URL}/tuitions/${studentId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Không thể lấy học phí theo MSSV");
  }

  return await response.json(); // { student_id, total, tuitions }
};
