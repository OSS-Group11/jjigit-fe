// src/pages/CreatePollPage.js
// 투표 생성 페이지 코드

import React from 'react';
import PollCreationForm from '../components/PollCreationForm';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';   // ✅ 커스텀 axios 인스턴스

const CreatePollPage = () => {
  const navigate = useNavigate();

  // ✅ 이 함수 하나만이 "투표 생성" API를 호출함
  const handleCreatePoll = async (newPollData) => {
    try {
      console.log('Creating poll with data:', newPollData);

      // ✅ 실제 백엔드에 POST 요청 (api 사용!)
      const response = await api.post('/api/polls', newPollData);
      const newPollId = response.data.id;  // Swagger에서 id 필드명 확인

      alert(`투표가 생성되었습니다! 링크를 공유하세요. (ID: ${newPollId})`);

      // ✅ 생성된 투표 상세 페이지로 이동
      navigate(`/poll/${newPollId}`);
    } catch (error) {
      console.error('Failed to create poll:', error);
      alert('투표 생성 중 오류가 발생했습니다.');
    }
  };

  const userIsLoggedIn = true; // 임시: 나중에 Context로 대체

  if (!userIsLoggedIn) {
    return <h2>로그인이 필요합니다.</h2>;
  }

  return (
    <div style={pageStyle}>
      {/* ✅ PollCreationForm은 onCreatePoll만 받고, API는 여기서만 호출 */}
      <PollCreationForm onCreatePoll={handleCreatePoll} />
    </div>
  );
};

const pageStyle = {
  padding: '40px',
  textAlign: 'center',
};

export default CreatePollPage;
