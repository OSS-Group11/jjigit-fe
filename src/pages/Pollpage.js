import React, { useState, useEffect } from 'react';
import PollVoting from '../components/PollVoting';
import PollResultsChart from '../components/PollResultsChart';
// Stomp.js 라이브러리 (또는 웹소켓 클라이언트)는 별도로 설치 필요

const PollPage = ({ pollId }) => {
  const [poll, setPoll] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  // 예시 데이터: 실제로는 API 호출로 가져옴
  const initialPollData = {
    id: 1,
    title: "오늘 점심은?",
    options: [
      { id: 101, text: "짜장면" },
      { id: 102, text: "김치찌개" },
      { id: 103, text: "샐러드" },
    ],
    results: { 101: 5, 102: 8, 103: 3 }
  };

  useEffect(() => {
    // 1. 초기 투표 데이터를 API에서 가져옵니다.
    setPoll(initialPollData);
    
    // 2. STOMP 연결을 설정하여 실시간 업데이트를 받습니다.
    // **이 부분은 실제 Stomp/WebSocket 클라이언트 라이브러리로 대체되어야 합니다.**
    /*
    const client = new StompClient();
    client.connect('/ws', () => {
      client.subscribe(`/topic/poll/${pollId}/updates`, (message) => {
        const newResults = JSON.parse(message.body);
        setPoll(prev => ({ ...prev, results: newResults }));
      });
    });
    return () => client.disconnect();
    */
  }, [pollId]);
  
  const handleVote = (optionId) => {
    // 투표 API 호출 로직 구현 (Spring Boot Backend API)
    console.log(`Voted for option ${optionId} in poll ${pollId}`);
    setHasVoted(true); // 투표 후 결과 화면을 보여주기 위해 상태 변경
    // 이후 실시간 통신(STOMP)을 통해 서버에서 업데이트된 결과를 받아옵니다.
  };

  if (!poll) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>{poll.title}</h1>
      <hr/>

      {/* 투표를 아직 안 했거나, 이미 투표를 했다면 결과 차트 표시 */}
      {hasVoted ? (
        <PollResultsChart pollData={poll} />
      ) : (
        <>
          <p>선택해 주세요.</p>
          <PollVoting options={poll.options} onVote={handleVote} />
        </>
      )}

      {/* 댓글 기능은 Planned 상태이므로, 추후 추가될 영역입니다. [cite: 43] */}
      <div style={{ marginTop: '30px' }}>
        <h3>댓글 (Planned)</h3>
        <p>이곳에 댓글과 LLM 기반 찬반 요약 기능이 추가될 예정입니다.</p>
      </div>
    </div>
  );
};

export default PollPage;
