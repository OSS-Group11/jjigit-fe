// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://3.37.253.134:8080",
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
