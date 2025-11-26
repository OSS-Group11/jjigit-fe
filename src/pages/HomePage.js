// 메인 랜딩 페이지 코드

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={homeStyle}>
      <h2>🚀 찍잇 (Jjigit): 빠르고 직관적인 오픈소스 투표 플랫폼</h2>
      <p>
        복잡한 설문 도구와 광고가 많은 서비스는 이제 그만!
        Jjigit은 누구나 쉽고 빠르게 투표를 만들고, 링크로 공유하며, 결과를 실시간 차트로 확인할 수 있는
        **완전한 오픈소스** 솔루션입니다.
      </p>
      
      <div style={featureBoxStyle}>
        <h3>주요 특징</h3>
        <ul>
          <li>✔️ **LLM 기반 주제 제안**을 통해 투표 생성이 편리합니다.</li>
          <li>✔️ 모든 기능이 **무료**이며 **광고가 없습니다**.</li>
          <li>✔️ 링크 하나로 투표 참여와 결과 공유가 간편합니다.</li>
        </ul>
      </div>

      <Link to="/create" style={buttonStyle}>
        지금 바로 투표 만들기
      </Link>
    </div>
  );
};

// 간단한 인라인 스타일
const homeStyle = {
    padding: '60px 20px',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto'
};

const featureBoxStyle = {
    background: '#f4f4f4',
    padding: '20px',
    borderRadius: '10px',
    margin: '30px 0',
    textAlign: 'left'
};

const buttonStyle = {
    display: 'inline-block',
    padding: '15px 30px',
    backgroundColor: '#61dafb',
    color: '#282c34',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
};

export default HomePage;
