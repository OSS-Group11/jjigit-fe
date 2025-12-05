// src/components/Layout.js
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* ⭐ 라우트 컴포넌트가 이 위치에 렌더링됨 */}
      <main className="flex-1 pt-16 px-4">
        <Outlet />
      </main>

      <footer className="app-footer text-center py-6 text-sm text-gray-500">
        <p>© 2025 Jjigit Project. Released under the Apache License 2.0.</p>
        <p>Group 11: 황혜림, 정상희, 김수연, 장형준</p>
      </footer>
    </div>
  );
}

export default Layout;
