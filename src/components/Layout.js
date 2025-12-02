// src/components/Layout.js
import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">{children}</main>

      <footer className="border-t text-[11px] text-gray-400 text-center py-2">
        © {new Date().getFullYear()} jjigit. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;
