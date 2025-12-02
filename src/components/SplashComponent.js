// src/components/SplashComponent.js

import React from 'react';
import './SplashComponent.css'; // 생성한 CSS 파일 임포트

function SplashComponent({ text }) {
  return (
    <div className="splash-screen">
      {/* 👈 [수정 1] 텍스트와 로더를 묶는 래퍼 추가 */}
      <div className="loader-wrapper"> 
        <span className="splash-text">
          {text} {/* 이 값은 "JJIGIT"이 될 것입니다 */}
        </span>
        
        {/* 로더를 아래에 별도의 줄로 배치 */}
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle r="32" cy="40" cx="40" id="test"></circle>
          </svg>
        </div>
      </div>
      
    </div>
  );
}

export default SplashComponent;
