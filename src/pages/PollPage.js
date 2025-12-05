// src/pages/PollPage.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PollVoting from "../components/PollVoting";
import PollResultsChart from "../components/PollResultsChart";
import api from "../api/axios";
import { Client } from "@stomp/stompjs";


import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";


const PollPage = () => {
  const { pollId } = useParams();
  const navigate = useNavigate();


  const [poll, setPoll] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [comments, setComments] = useState([]);
  const [copiedLink, setCopiedLink] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // ⭐ 로그인 체크
  useEffect(() => {
    const token = localStorage.getItem("jjigit-token");
    setIsLoggedIn(!!token);
  }, []);


  // ⭐ handleAddComment — ESLint 오류 해결됨
  const handleAddComment = async ({ optionId, content, parentId = null }) => {
    try {
      const res = await api.post(`/api/polls/${pollId}/comments`, {
        optionId,
        content,
        parentId,
      });
      setComments((prev) => [...prev, res.data]);
    } catch (e) {
      console.error(e);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
 };


  // ⭐ 투표 + 댓글 불러오기
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        // 1) 투표 기본 정보 (공개 API)
        const pollRes = await api.get(`/api/polls/${pollId}`);
        setPoll(pollRes.data);

        // 2) 로그인 사용자만 voted API 호출
        const token = localStorage.getItem("jjigit-token");
        if (token) {
          try {
            const statusRes = await api.get(`/api/polls/${pollId}/voted`);
            setHasVoted(statusRes.data.hasVoted || false);
          } catch (e) {
            console.error("voted API 오류(무시해도 됨):", e);
            // 로그인 중이지만 voted API 에러는 UI 영향을 주지 않으므로 alert 금지
          }
        } else {
          setHasVoted(false); // 비로그인 = 투표 안 함
        }

        // 3) 댓글 목록 조회 (공개 API)
        const commentsRes = await api.get(`/api/polls/${pollId}/comments`);
        setComments(commentsRes.data.comments || []);

      } catch (e) {
        console.error("poll 데이터 불러오기 오류:", e);
        alert("투표 정보를 불러오는 중 오류가 발생했습니다."); // 이 alert는 정상적으로 한 번만 뜸
      }
    };

    if (pollId) fetchPoll();
  }, [pollId]);



  // ⭐ 실시간 STOMP 업데이트
  useEffect(() => {
    if (!pollId) return;


    const client = new Client({
      brokerURL: process.env.REACT_APP_WS_URL || "wss://3.37.253.134/ws",
      reconnectDelay: 500,
    });


    client.onConnect = () => {
      client.subscribe(`/topic/poll/${pollId}`, (message) => {
        const newResults = JSON.parse(message.body);
        setPoll((prev) => (prev ? { ...prev, results: newResults } : prev));
      });
    };


    client.activate();
    return () => client.deactivate();
  }, [pollId]);


  // ⭐ 투표 기능
  const handleVote = async (optionId) => {
    try {
      await api.post(`/api/polls/${pollId}/vote`, { optionId });


      const updatedPoll = await api.get(`/api/polls/${pollId}`);
      setPoll(updatedPoll.data);


      setHasVoted(true);
    } catch (error) {
      console.error(error);
      alert("투표 중 오류가 발생했습니다.");
    }
  };


  // ⭐ 공유 버튼
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/poll/${pollId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("투표 링크가 복사되었습니다!");
    } catch {
      setCopiedLink(shareUrl);
    }
  };


  if (!poll) return <div>로딩 중...</div>;


  return (
    <div className="px-6 py-10 flex flex-col items-center">


      {/* 제목 영역 */}
      <div className="w-full max-w-3xl mb-3 mx-auto text-center">
        {/* 제목 */}
        <h1 className="text-4xl font-bold mb-3">{poll.title}</h1>

        {/* 서브 설명 */}
        {poll.description && (
          <p className="text-sm text-gray-600 mb-4">{poll.description}</p>
        )}

        {/* 공유 버튼을 제목보다 아래 + 오른쪽 정렬 */}
        <div className="flex justify-end">
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            투표 공유하기
          </button>
        </div>
      </div>



      {/* 본문 (투표/결과) */}
      <div className="w-full max-w-3xl bg-white border shadow-md rounded-2xl p-8 mb-12">


        {/* 🔥 1) 비로그인 → 결과만 보여줌 */}
        {!isLoggedIn && <PollResultsChart pollData={poll} />}


        {/* 🔥 2) 로그인 + 이미 투표함 → 결과 */}
        {isLoggedIn && hasVoted && <PollResultsChart pollData={poll} />}


        {/* 🔥 3) 로그인 + 투표 전 → 투표 UI */}
        {isLoggedIn && !hasVoted && (
          <>
            <p className="mb-4 text-sm text-gray-600">옵션을 선택해주세요.</p>
            <PollVoting options={poll.options} onVote={handleVote} />
          </>
        )}


        {/* 🔥 비로그인 → 로그인 유도 버튼 */}
        {!isLoggedIn && (
          <div className="text-center mt-6">
            <p className="text-gray-600 mb-4">투표하려면 로그인이 필요합니다.</p>
            <button
              onClick={() => navigate(`/login?redirectTo=/poll/${pollId}`)}
              className="px-5 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700"
            >
              나도 투표하러 가기 →
            </button>
          </div>
        )}
      </div>


      {/* 링크 복사 실패 시 표시 */}
      {copiedLink && (
        <div className="text-center mt-3">
          <p className="text-xs text-gray-500">아래 링크를 직접 복사하세요:</p>
          <p className="text-blue-600 font-mono">{copiedLink}</p>
        </div>
      )}


      {/* 댓글 영역 */}
      <div className="w-full max-w-3xl">
        <h3 className="text-2xl font-bold mb-5">댓글</h3>


        <div className="space-y-5 mb-10">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">아직 댓글이 없습니다.</p>
          ) : (
            <CommentList comments={comments.filter((c) => c.optionId == null)} />
          )}
        </div>


        <div className="bg-white shadow-md rounded-2xl border p-5">
          <CommentForm
            onSubmit={(content) =>
              handleAddComment({ optionId: null, content })
            }
          />
          <p className="text-xs text-gray-500 mt-4">
            이곳에 LLM 기반 요약 기능이 추가될 예정입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PollPage;