// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 기존 컴포넌트
import Header from './components/Header';
import SplashComponent from './components/SplashComponent';
import HomePage from './pages/HomePage';
import CreatePollPage from './pages/CreatePollPage';
import PollPage from './pages/PollPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// 새로 추가되는 페이지
import CommunityPage from './pages/CommunityPage';
import NoticePage from './pages/NoticePage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // 스플래시 화면
  if (isLoading) {
    return <SplashComponent text="JJIGIT" />;
  }

  return (
    <Router>
      <div className="App">
        {/* 모든 페이지에서 공통으로 나타나는 Header */}
        <Header />

        <main className="min-h-screen">

          <Routes>
            {/* 기존 라우트 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePollPage />} />
            <Route path="/poll/:pollId" element={<PollPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* 새로 추가된 라우트 */}
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/notice" element={<NoticePage />} />

            {/* 404 */}
            <Route path="*" element={<h1>404 Page Not Found</h1>} />
          </Routes>
        </main>

        {/* footer */}
        <footer className="app-footer text-center">
          <p>© 2025 Jjigit Project. Released under the Apache License 2.0.</p>
          <p>Group 11: 황혜림, 정상희, 김수연, 장형준</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
