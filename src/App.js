// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* 기존 컴포넌트 */
import Header from "./components/Header";
import SplashComponent from "./components/SplashComponent";
import HomePage from "./pages/HomePage";
import CreatePollPage from "./pages/CreatePollPage";
import PollPage from "./pages/Pollpage"; // 기존 PollDetail 유지
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CommunityPage from "./pages/CommunityPage";

/* 새 구조 */
import Layout from "./components/Layout"; // Layout이 Header/Footer를 포함하도록 구성할 예정
import { AuthProvider, useAuth } from "./contexts/AuthContext";

/* 로그인 보호 라우트 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  /* Splash 실행 */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashComponent text="JJIGIT" />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* 기본 페이지 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/community" element={<CommunityPage />} />

            {/* Poll 상세 */}
            <Route path="/poll/:pollId" element={<PollPage />} />

            {/* 로그인 / 회원가입 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* 투표 생성 → 보호됨 */}
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePollPage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<h1>404 Page Not Found</h1>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
