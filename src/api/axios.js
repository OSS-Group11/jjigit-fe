// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "", // 프록시 쓰면 빈 문자열, 아니면 "http://localhost:8080"
});

// 요청마다 JWT 토큰 자동 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
