import React from 'react';
import PollCreationForm from '../components/PollCreationForm';
import { useNavigate } from 'react-router-dom';

const CreatePollPage = () => {
  const navigate = useNavigate();

  const handleCreatePoll = (newPollData) => {
    // 1. 서버 API를 호출하여 투표를 생성하고 링크를 받습니다.
    console.log("Creating poll with data:", newPollData);

    // 2. 서버 응답으로 받은 새로운 투표 ID를 사용하여 해당 페이지로 이동합니다.
    const newPollId = Math.floor(Math.random() * 1000) + 1; // 임시 ID
    alert(`투표가 생성되었습니다! 링크를 공유하세요. (ID: ${newPollId})`);
    navigate(`/poll/${newPollId}`);
  };

  [cite_start]// 'Login' 기능이 Ready 상태 [cite: 40] 이므로, 실제 앱에서는 로그인 여부를 체크해야 합니다.
  const userIsLoggedIn = true; // 임시로 true 설정

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
