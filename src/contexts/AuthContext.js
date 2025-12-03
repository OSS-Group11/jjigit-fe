// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);               // 사용자 정보
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 여부
  const [loading, setLoading] = useState(true);         // 인증 로딩 상태

  // ⭐ 우리 프로젝트의 토큰 이름 통일
  const TOKEN_KEY = "jjigit-token";

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      validateToken(token); // 토큰 검증 요청
    } else {
      setLoading(false);
    }
  }, []);

  /** -----------------------------------------
   *  🔐 토큰 유효성 검증
   * ----------------------------------------- */
  const validateToken = async (token) => {
    try {
      const response = await fetch("/api/auth/validate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch (err) {
      console.error("Token validation failed:", err);
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  };

  /** -----------------------------------------
   *  🔑 로그인 처리
   * ----------------------------------------- */
  const login = (token, userData) => {
    localStorage.setItem(TOKEN_KEY, token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  /** -----------------------------------------
   *  🚪 로그아웃 처리
   * ----------------------------------------- */
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* Context 사용 훅 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
