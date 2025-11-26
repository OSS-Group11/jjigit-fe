/// React 렌더링 코드 (수정 필요)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 필요하다면 이 파일에 기본 CSS를 추가합니다.
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
