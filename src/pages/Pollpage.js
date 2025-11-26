// 투표 참여/결과 페이지 코드

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PollVoting from '../components/PollVoting';
import PollResultsChart from '../components/PollResultsChart';
import axios from "axios";
import { Client } from '@stomp/stompjs';
// Stomp.js 라이브러리 (또는 웹소켓 클라이언트)는 별도로 설치 필요

const PollPage = () => {
  const { pollId } = useParams(); // URL 파라미터에서 pollId를 가져옴
  const [poll, setPoll] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  // 예시 데이터: 실제로는 API 호출로 가져옴
  const initialPollData = {
    id: pollId,
    title: `투표 ID ${pollId}: 오늘 점심은?`,
    options: [
      { id: 101, text: "짜장면" },
      { id: 102, text: "김치찌개" },
      { id: 103, text: "샐러드" },
    ],
    results: { 101: 5, 102: 8, 103: 3 }
  };

  useEffect(() => {
    const client = new Client({
      brokerURL: process.env.REACT_APP_WS_URL || "ws://localhost:8080/ws",
      reconnectDelay: 500,
    });

    client.onConnect = () => {
      client.subscribe(`/topic/poll/${pollId}`, (message) => {
        const newResults = JSON.parse(message.body);
        setPoll(prev => ({ ...prev, results: newResults }));
      });
    };

    client.activate();
    return () => client.deactivate();
    
  }, [pollId]);
  
  const handleVote = async (optionId) => {
    // 투표 API 호출 로직 구현 (Spring Boot Backend API)
    try {
    await axios.post(`/api/polls/${pollId}/vote`, { optionId });

    // 투표 완료 → 바로 결과 화면 표시
    setHasVoted(true);// 투표 후 결과 화면을 보여주기 위해 상태 변경
    // 이후 실시간 통신(STOMP)을 통해 서버에서 업데이트된 결과를 받아옵니다.
  } catch (error) {
    console.error(error);
    alert("투표 중 오류가 발생했습니다.");
  }
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

      {/* 댓글 기능은 Planned 상태이므로, 추후 추가될 영역입니다. */}
      <div style={{ marginTop: '30px' }}>
        <h3>댓글 (Planned)</h3>
        <p>이곳에 댓글과 LLM 기반 찬반 요약 기능이 추가될 예정입니다.</p>
      </div>
    </div>
  );
};

export default PollPage;
