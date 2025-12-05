// src/api/axios.js
import axios from "axios";

const api = axios.create({
  // Vercel rewrites를 통해 백엔드로 프록시
  baseURL: "http://localhost:8080",  // 같은 도메인 사용 (Vercel이 /api를 백엔드로 프록시)
});

// 요청마다 JWT 토큰 자동 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jjigit-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
