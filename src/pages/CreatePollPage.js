// 투표 생성 페이지 코드

import React from 'react';
import PollCreationForm from '../components/PollCreationForm';
import { useNavigate } from 'react-router-dom';
import axios from "axios";   // 🟢 반드시 필요

const CreatePollPage = () => {
  const navigate = useNavigate();

  // 🔥 async 필요
  const handleCreatePoll = async (newPollData) => {
    try {
      console.log("Creating poll with data:", newPollData);

      // 🟢 실제 백엔드에 POST 요청
      const response = await axios.post("/api/polls", newPollData);
      const newPollId = response.data.id;

      alert(`투표가 생성되었습니다! 링크를 공유하세요. (ID: ${newPollId})`);

      // 🟢 이동은 한 번만 수행
      navigate(`/poll/${newPollId}`);

    } catch (error) {
      console.error("Failed to create poll:", error);
      alert("투표 생성 중 오류가 발생했습니다.");
    }
  };

  const userIsLoggedIn = true; // 임시: 나중에 Context로 대체

  if (!userIsLoggedIn) {
    return <h2>로그인이 필요합니다.</h2>;
  }

  return (
    <div style={pageStyle}>
      <PollCreationForm onCreatePoll={handleCreatePoll} />
    </div>
  );
};

const pageStyle = {
  padding: '40px',
  textAlign: 'center'
};

export default CreatePollPage;
