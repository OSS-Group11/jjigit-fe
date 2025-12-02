// src/components/PollCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const PollCard = ({ poll }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 기존 라우팅 유지 (에러 방지)
    navigate(`/poll/${poll.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition overflow-hidden"
    >
      {/* 썸네일 추가 */}
      {poll.thumbnailUrl && (
        <img
          src={poll.thumbnailUrl}
          alt={poll.title}
          className="w-full h-32 object-cover"
        />
      )}

      <div className="p-4">
        {/* 제목 */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {poll.title}
        </h3>

        {/* 설명 (optional) */}
        {poll.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {poll.description}
          </p>
        )}

        {/* 공개/비공개 표시 (기존 기능 유지) */}
        <p className="text-sm text-gray-500">
          {poll.isPublic ? "공개 투표" : "비공개 투표"}
        </p>
      </div>
    </div>
  );
};

export default PollCard;
