import React from "react";

export default function Header({ onLogout, currentUser }) {
  return (
    <header style={{ padding: "10px", background: "#eee" }}>
      <h3>My App Header</h3>
      {currentUser ? (
        <>
          <span>Xin chào, {currentUser.username}</span>
          <button onClick={onLogout}>Đăng xuất</button>
        </>
      ) : (
        <span>Chưa đăng nhập</span>
      )}
    </header>
  );
}
