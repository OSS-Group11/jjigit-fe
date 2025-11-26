//APP.js: 메인 라우팅 코드

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 컴포넌트 가져오기
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CreatePollPage from './pages/CreatePollPage';
import PollPage from './pages/PollPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* 모든 페이지에 표시될 헤더 */}
        <Header />
        
        {/* 페이지별 라우팅 설정 */}
        <main style={{ padding: '20px' }}>
          <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<HomePage />} />
            
            {/* 투표 생성 페이지 */}
            <Route path="/create" element={<CreatePollPage />} />
            
            {/* 특정 투표 페이지 (URL 파라미터로 Poll ID 전달) */}
            <Route path="/poll/:pollId" element={<PollPage />} />
            
            {/* 404 Not Found (선택 사항) */}
            <Route path="*" element={<h1>404 Page Not Found</h1>} />
          </Routes>
        </main>
        
        <footer style={footerStyle}>
            <p>© 2025 Jjigit Project. Released under the MIT License.</p>
            <p>Group 11: 황혜림, 정상희, 김수연, 장형준</p>
        </footer>
      </div>
    </Router>
  );
}

const footerStyle = {
    textAlign: 'center',
    padding: '20px',
    marginTop: '50px',
    borderTop: '1px solid #ccc',
    color: '#555',
    fontSize: '0.9em'
};

export default App;
