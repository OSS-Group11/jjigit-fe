import React, { useState } from 'react';
import api from '../api/axios';      // ✅ 변경점: 커스텀 axios 사용
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();   // ✅ 로그인 성공 후 이동용

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ 실제 백엔드 로그인 API 호출 (경로는 Swagger 기준으로 확인)
      const response = await api.post('/api/auth/login', {
        username,
        password,
      });

      // 백엔드 응답 구조에 맞게 수정 (예: { token: "..."} 또는 { accessToken: "..." })
      const token = response.data.token;   // 필요시 키 이름 확인

      // ✅ 토큰 저장
      localStorage.setItem('jwtToken', token);

      alert('로그인 성공!');
      navigate('/');   // 혹은 '/create-poll' 등 원하는 경로

    } catch (error) {
      console.error('Login failed:', error);
      alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    // 중앙 정렬 및 카드형 레이아웃
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          로그인
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 아이디 (Username) 입력 필드 */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              아이디 (Username)
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white transition duration-150"
              placeholder="아이디를 입력하세요"
            />
          </div>

          {/* 비밀번호 (Password) 입력 필드 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              비밀번호 (Password)
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white transition duration-150"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-150 text-lg"
          >
            로그인하기
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          계정이 없으신가요? 
          <Link
            to="/signup"  // 원하는 회원가입 페이지 경로
            className="font-medium text-blue-600 hover:text-blue-500 ml-1"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
