// src/pages/CreatePollPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; 
import PollCreationForm from "../components/PollCreationForm";

const CreatePollPage = () => {
  const navigate = useNavigate();
  const [shareLink, setShareLink] = useState(null);

  // 투표 생성 API 처리 (백엔드 API 스펙에 맞게 수정)
  const handleCreatePoll = async (formValues) => {
    const { title, description, options, isPublic } = formValues;

    try {
      console.log("Creating poll with data:", formValues);

      // 빈 옵션 제거
      const validOptions = options.filter((o) => o.trim());

      if (validOptions.length < 2) {
        alert("투표는 최소 2개 이상의 선택지가 필요합니다.");
        return;
      }

      // 백엔드 API 요청 형식: { title, description, isPublic, options: [{optionText, optionOrder}] }
      const requestBody = {
        title,
        description: description || "",
        isPublic,
        options: validOptions.map((optionText, index) => ({
          optionText,
          optionOrder: index + 1
        })),
      };

      // 백엔드로 전송
      const response = await api.post("/api/polls", requestBody);

      const newPoll = response.data;
      const newPollId = newPoll.pollId;

      // 공유 링크 저장
      const link = `${window.location.origin}/poll/${newPollId}`;
      setShareLink(link);

      alert("투표가 생성되었습니다! 링크를 공유하세요.");

      // 생성된 투표 상세 페이지로 이동
      navigate(`/poll/${newPollId}`);
    } catch (error) {
      console.error("Failed to create poll:", error);
      alert("투표 생성 중 오류가 발생했습니다.");
    }
  };

  const handleCopy = async () => {
    if (!shareLink) return;
    await navigator.clipboard.writeText(shareLink);
    alert("링크가 복사되었습니다.");
  };

  const userIsLoggedIn = true;

  if (!userIsLoggedIn) {
    return <h2>로그인이 필요합니다.</h2>;
  }

  return (
    <div className="px-8 py-8 max-w-2xl mx-auto space-y-4">
      {/* PollCreationForm은 onCreatePoll만 받도록 일관성 유지 */}
      <PollCreationForm onCreatePoll={handleCreatePoll} />

      {/* 공유 링크 UI */}
      {shareLink && (
        <div className="border rounded p-3 text-xs flex items-center gap-2">
          <span className="flex-1 break-all">{shareLink}</span>
          <button
            onClick={handleCopy}
            className="px-3 py-1 border rounded"
          >
            링크 복사
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatePollPage;
