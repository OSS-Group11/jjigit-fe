// 헤더 컴포넌트 코드

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1 style={{ margin: 0 }}>
        <Link to="/" style={linkStyle}>찍잇 (Jjigit)</Link>
      </h1>
      <nav>
        <Link to="/create" style={linkStyle}>새 투표 만들기</Link>
        {/* 로그인 기능은 Ready 상태이므로, 로그인/로그아웃 버튼 추가 */}
        <button style={buttonStyle}>로그인</button> 
      </nav>
    </header>
  );
};

// 간단한 인라인 스타일
const headerStyle = {
  background: '#282c34',
  color: 'white',
  padding: '15px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  marginRight: '20px',
  fontSize: '1.1em',
};

const buttonStyle = {
  padding: '8px 15px',
  fontSize: '1em',
  cursor: 'pointer',
  backgroundColor: '#61dafb',
  border: 'none',
  borderRadius: '5px',
  color: '#282c34',
  fontWeight: 'bold',
};

export default Header;
