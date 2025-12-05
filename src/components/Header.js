// src/components/Header.js

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const isActive = (path) =>
    location.pathname === path ||
    (path === "/community" && location.pathname.startsWith("/community"));

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      alert("로그아웃되었습니다.");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* 좌측: 홈/커뮤니티 버튼 + JJIGIT 로고 */}
        <div className="flex items-center gap-4">
          {/* 기존 JJIGIT 로고 유지 */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wider bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            JJIGIT
          </Link>
          
          {/* 홈 / 커뮤니티 */}
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => navigate("/")}
              className={`px-2 py-1 rounded transition ${
                isActive("/") ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              홈
            </button>

            <button
              onClick={() => navigate("/community")}
              className={`px-2 py-1 rounded transition ${
                isActive("/community") ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              커뮤니티
            </button>
          </div>

          
        </div>

        {/* 우측: 로그인/로그아웃 */}
        <div className="flex items-center gap-6 text-sm">
          <button
            onClick={handleAuthAction}
            className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            {isAuthenticated ? "로그아웃" : "로그인"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
