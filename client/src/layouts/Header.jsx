import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        <NavLink to="/">Trang chủ</NavLink>
        <NavLink to="/list-post">Danh sách bài viết</NavLink>
        <NavLink to="/create-post">Thêm mới bài viết</NavLink>
      </nav>
    </>
  );
}
