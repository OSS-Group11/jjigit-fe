// src/pages/PollPage.js
// 투표 참여/결과 페이지 코드

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PollVoting from '../components/PollVoting';
import PollResultsChart from '../components/PollResultsChart';
import api from '../api/axios';
import { Client } from '@stomp/stompjs';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';


const PollPage = () => {
  const { pollId } = useParams(); // URL 파라미터에서 pollId를 가져옴
  const [poll, setPoll] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [comments, setComments] = useState([]);

  // 1) 투표 상세/결과 불러오기 (더미 데이터 제거)
  useEffect(() => {
   const fetchPoll = async () => {
      try {
        const pollRes = await api.get(`/api/polls/${pollId}`);
        setPoll(pollRes.data);

        const statusRes = await api.get(`/api/polls/${pollId}/status`);
        setHasVoted(statusRes.data.hasVoted);

        const commentsRes = await api.get(`/api/polls/${pollId}/comments`);
        // 🔥 swagger: { comments: [...] }
        setComments(commentsRes.data.comments);
      } catch (e) {
        console.error(e);
        alert('투표 정보를 불러오는 중 오류가 발생했습니다.');
      }
    };

    if (pollId) fetchPoll();   // ✅ 여기! 함수 이름 맞춰주기
  }, [pollId]);

  const handleAddComment = async (content) => {
    try {
      const res = await api.post(`/api/polls/${pollId}/comments`, { content });
      // 백엔드가 생성된 댓글을 돌려준다고 가정
      setComments((prev) => [...prev, res.data]);
    } catch (e) {
      console.error(e);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  // 2) STOMP 실시간 결과 업데이트
  useEffect(() => {
    if (!pollId) return;

    const client = new Client({
      brokerURL: process.env.REACT_APP_WS_URL || 'ws://localhost:8080/ws',
      reconnectDelay: 500,
    });

    client.onConnect = () => {
      client.subscribe(`/topic/poll/${pollId}`, (message) => {
        const newResults = JSON.parse(message.body);
        // poll이 아직 로드 안 된 상태에서 호출될 수 있으므로 방어 코드
        setPoll((prev) => (prev ? { ...prev, results: newResults } : prev));
      });
    };

    client.activate();
    return () => client.deactivate();
  }, [pollId]);

  // 3) 투표하기
  const handleVote = async (optionId) => {
    try {
      await api.post(`/api/polls/${pollId}/vote`, { optionId });

      // 투표 완료 → 결과 화면 표시
      setHasVoted(true);
      // 이후 실시간 통신(STOMP)을 통해 서버에서 업데이트된 결과를 받아옵니다.
    } catch (error) {
      console.error(error);
      alert('투표 중 오류가 발생했습니다.');
    }
  };

  if (!poll) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>{poll.title}</h1>
      <hr />

      {/* hasVoted 상태에 따라 투표/결과 화면 분기 */}
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
        <h3>댓글</h3>
        <CommentList comments={comments} />
        <CommentForm onSubmit={handleAddComment} />
        <p>이곳에 LLM 기반 찬반 요약 기능이 추가될 예정입니다.</p>
      </div>
    </div>
  );
};

export default PollPage;
