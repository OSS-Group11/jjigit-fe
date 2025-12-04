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
        // 투표 상세 정보 가져오기
        const pollRes = await api.get(`/api/polls/${pollId}`);
        setPoll(pollRes.data);

        // 투표 여부 확인 (인증 필요)
        try {
          const statusRes = await api.get(`/api/polls/${pollId}/voted`);
          console.log("Vote status response:", statusRes.data);
          setHasVoted(statusRes.data.hasVoted || false);
        } catch (err) {
          // 인증되지 않은 경우 투표 안한 것으로 처리
          console.log("Vote status check failed:", err.response?.status, err.response?.data);
          setHasVoted(false);
        }

        // 댓글 목록 가져오기
        const commentsRes = await api.get(`/api/polls/${pollId}/comments`);
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
      // 투표 성공 후 투표 정보 다시 불러오기
      const pollRes = await api.get(`/api/polls/${pollId}`);
      setPoll(pollRes.data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        alert("투표하려면 로그인이 필요합니다.");
      } else if (error.response?.status === 409) {
        alert("이미 이 투표에 참여하셨습니다.");
      } else {
        alert("투표 중 오류가 발생했습니다.");
      }
    }
  };

  // 4) 댓글 생성
  const handleAddComment = async ({ content }) => {
    try {
      const res = await api.post(`/api/polls/${pollId}/comments`, {
        content,
      });
      // BE가 생성된 댓글을 돌려줌
      setComments((prev) => [...prev, res.data]);
    } catch (e) {
      console.error(e);
      if (e.response?.status === 401) {
        alert("댓글을 작성하려면 로그인이 필요합니다.");
      } else {
        alert("댓글 작성 중 오류가 발생했습니다.");
      }
    }
  };

  // 5) 댓글 수정 (백엔드 API에 없음 - 추후 구현)
  // const handleUpdateComment = async (commentId, content) => {
  //   try {
  //     const res = await api.put(
  //       `/api/polls/${pollId}/comments/${commentId}`,
  //       { content }
  //     );
  //     const updated = res.data;
  //     setComments((prev) =>
  //       prev.map((c) =>
  //         c.commentId === commentId ? { ...c, ...updated } : c
  //       )
  //     );
  //   } catch (e) {
  //     console.error(e);
  //     alert("댓글 수정 중 오류가 발생했습니다.");
  //   }
  // };

  if (!poll) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">투표 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 상단바 여백 */}
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* 헤더 섹션 */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{poll.title}</h1>
            {poll.description && (
              <p className="text-lg text-gray-600 leading-relaxed">{poll.description}</p>
            )}
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <span>총 {poll.totalVotes || 0}명 참여</span>
              {poll.createdAt && (
                <span>· {new Date(poll.createdAt).toLocaleDateString()}</span>
              )}
            </div>
          </div>

          {/* 투표/결과 섹션 */}
          <div className="mb-12">
            {hasVoted ? (
              <PollResultsChart pollData={poll} />
            ) : (
              <div>
                <p className="mb-4 text-lg font-medium text-gray-700">선택해 주세요</p>
                <PollVoting options={poll.options} onVote={handleVote} />
              </div>
            )}
          </div>

          {/* 댓글 섹션 */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              댓글 {comments.length > 0 && `(${comments.length})`}
            </h3>

            {/* 댓글 목록 */}
            {comments.length > 0 ? (
              <div className="space-y-4 mb-6">
                {comments.map((comment) => (
                  <div
                    key={comment.commentId}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <p className="text-base text-gray-800 mb-2">{comment.content}</p>
                    <div className="text-sm text-gray-500">
                      {comment.author && `${comment.author} · `}
                      {comment.createdAt && new Date(comment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 mb-6">
                첫 번째 댓글을 작성해보세요!
              </p>
            )}

            {/* 댓글 작성 폼 */}
            <div>
              <CommentForm onSubmit={(content) => handleAddComment({ content })} />
            </div>

            {/* LLM 요약 안내 */}
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-800">
                💡 <span className="font-semibold">Coming Soon:</span> AI 기반 찬반 의견 요약 기능이 추가될 예정입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollPage;
