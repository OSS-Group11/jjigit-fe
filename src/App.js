//APP.js: 메인 라우팅 코드

// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 컴포넌트 가져오기
import Header from './components/Header';
import SplashComponent from './components/SplashComponent'; // 👈 [추가] 로딩 컴포넌트 임포트
import HomePage from './pages/HomePage';
import CreatePollPage from './pages/CreatePollPage';
import PollPage from './pages/PollPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


function App() {

  const [isLoading, setIsLoading] = useState(true); // 👈 [추가] 로딩 상태 관리

  useEffect(() => {
    // 💡 초기 앱 설정 및 데이터 로딩 로직 (예: 사용자 인증 확인, 환경 설정 로드)
    // 현재는 3초 후에 로딩을 종료하는 타이머로 대체합니다.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 로딩 화면 표시 시간 (2.5초)

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  // 👈 [수정] isLoading 상태에 따라 SplashComponent를 조건부 렌더링
  if (isLoading) {
    return <SplashComponent text="JJIGIT" />; // SplashComponent가 렌더링될 때 text prop 전달
  }

  // 로딩 완료 후, 메인 앱 콘텐츠 렌더링
  return (
    <Router>
      <div className="App">
        {/* 모든 페이지에 표시될 헤더 */}
        <Header />
        
        <main className="min-h-screen"> {/* min-h-screen 추가하여 푸터가 아래쪽에 위치하도록 함 */}
          <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<HomePage />} />
            
            {/* 로그인 페이지 (새로 추가) */}
            <Route path="/login" element={<LoginPage />} /> 
            
            <Route path="/signup" element={<SignupPage />} />   {/* ✅ 추가 */}
            
            {/* 투표 생성 페이지 */}
            <Route path="/create" element={<CreatePollPage />} />
            
            {/* 특정 투표 페이지 */}
            <Route path="/poll/:pollId" element={<PollPage />} />
            
            {/* 404 Not Found (선택 사항) */}
            <Route path="*" element={<h1>404 Page Not Found</h1>} />
          </Routes>
        </main>
        
        <footer className="app-footer text-center">
            <p>© 2025 Jjigit Project. Released under the Apache License 2.0.</p>
            <p>Group 11: 황혜림, 정상희, 김수연, 장형준</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
