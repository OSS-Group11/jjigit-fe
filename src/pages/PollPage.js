// src/pages/PollPage.js
// 투표 참여/결과 + 옵션별 댓글 페이지

/*주의
BE 댓글 스키마가 현재 optionId, parentId가 없으면, 우선 FE 구조만 이렇게 잡아두고 BE에 필드 추가가 필요하다.
commentId 필드를 그대로 사용하고, 응답에도 포함되도록 맞추면 된다.​
*/


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PollVoting from "../components/PollVoting";
import PollResultsChart from "../components/PollResultsChart";
import api from "../api/axios";
import { Client } from "@stomp/stompjs";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

const PollPage = () => {
  const { pollId } = useParams(); // URL 파라미터에서 pollId를 가져옴
  const [poll, setPoll] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [comments, setComments] = useState([]);

  // 1) 투표 상세/결과 + 댓글 불러오기
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const pollRes = await api.get(`/api/polls/${pollId}`);
        setPoll(pollRes.data);

        const statusRes = await api.get(`/api/polls/${pollId}/status`);
        setHasVoted(statusRes.data.hasVoted);

        const commentsRes = await api.get(
          `/api/polls/${pollId}/comments`
        );
        // swagger: { comments: [...] } 형태라고 가정
        setComments(commentsRes.data.comments || []);
      } catch (e) {
        console.error(e);
        alert("투표 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };

    if (pollId) fetchPoll();
  }, [pollId]);

  // 2) STOMP 실시간 결과 업데이트
  useEffect(() => {
    if (!pollId) return;

    const client = new Client({
      brokerURL: process.env.REACT_APP_WS_URL || "ws://localhost:8080/ws",
      reconnectDelay: 500,
    });

    client.onConnect = () => {
      client.subscribe(`/topic/poll/${pollId}`, (message) => {
        const newResults = JSON.parse(message.body);
        setPoll((prev) =>
          prev ? { ...prev, results: newResults } : prev
        );
      });
    };

    client.activate();
    return () => client.deactivate();
  }, [pollId]);

  // 3) 투표하기
  const handleVote = async (optionId) => {
    try {
      await api.post(`/api/polls/${pollId}/vote`, { optionId });
      setHasVoted(true);
      // 실제 결과 값은 STOMP로 들어옴
    } catch (error) {
      console.error(error);
      alert("투표 중 오류가 발생했습니다.");
    }
  };

  // 4) 댓글 생성 (옵션별 + 대댓글)
  const handleAddComment = async ({
    optionId,
    content,
    parentId = null,
  }) => {
    try {
      const res = await api.post(`/api/polls/${pollId}/comments`, {
        optionId,
        content,
        parentId,
      });
      // BE가 생성된 댓글 1개를 돌려준다고 가정
      setComments((prev) => [...prev, res.data]);
    } catch (e) {
      console.error(e);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  // 5) 댓글 수정
  const handleUpdateComment = async (commentId, content) => {
    try {
      const res = await api.put(
        `/api/polls/${pollId}/comments/${commentId}`,
        { content }
      );
      const updated = res.data;
      setComments((prev) =>
        prev.map((c) =>
          c.commentId === commentId ? { ...c, ...updated } : c
        )
      );
    } catch (e) {
      console.error(e);
      alert("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  if (!poll) return <div>로딩 중...</div>;

  return (
    <div className="px-6 py-6">
      <h1 className="text-xl font-bold mb-2">{poll.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{poll.description}</p>
      <hr className="mb-4" />

      {/* hasVoted 상태에 따라 투표/결과 화면 분기 */}
      {hasVoted ? (
        <PollResultsChart pollData={poll} />
      ) : (
        <>
          <p className="mb-2 text-sm">선택해 주세요.</p>
          <PollVoting options={poll.options} onVote={handleVote} />
        </>
      )}

      {/* 옵션별 댓글 스레드 */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">댓글</h3>
        {poll.options && poll.options.length > 0 && (
          <CommentList
            options={poll.options}
            comments={comments}
            onCreate={handleAddComment}
            onUpdate={handleUpdateComment}
          />
        )}

        {/* 전체 투표에 대한 일반 댓글만 따로 쓰고 싶다면 아래 폼 그대로 유지 가능 */}
        <div className="mt-4">
          <CommentForm onSubmit={(content) =>
            handleAddComment({ optionId: null, content })
          } />
        </div>

        <p className="mt-4 text-xs text-gray-500">
          이곳에 LLM 기반 찬반 요약 기능이 추가될 예정입니다.
        </p>
      </div>
    </div>
  );
};

export default PollPage;
