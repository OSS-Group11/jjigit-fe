// src/pages/SignupPage.js
import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return; 
    }

    try {
      // ✅ 실제 백엔드 회원가입 API 호출
      // Swagger에서 /api/auth/signup 의 요청 body 구조를 확인해서 맞춰야 합니다.
      const response = await api.post('/api/auth/signup', {
        username,
        password,
      });

      console.log('Signup success:', response.data);
      alert('회원가입 성공! 이제 로그인해 주세요.');
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('회원가입 중 오류가 발생했습니다. (이미 존재하는 아이디일 수 있어요)');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          회원가입
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              아이디 (Username)
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white transition"
              placeholder="사용하실 아이디를 입력하세요"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white transition"
              placeholder="비밀번호를 입력하세요"
            />
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              비밀번호는 8자리 이상이어야 합니다.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white transition"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="
              w-full py-3
              bg-purple-600 text-white font-bold
              rounded-lg shadow-lg
              hover:bg-purple-700
              transition duration-150 text-lg
            "          
          >
            회원가입 하기
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          이미 계정이 있으신가요?
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-medium text-blue-600 hover:text-blue-500 ml-1"
          >
            로그인
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
