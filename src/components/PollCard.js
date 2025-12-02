// src/components/PollCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const PollCard = ({ poll }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/poll/${poll.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-2xl shadow-md p-4 hover:shadow-lg hover:-translate-y-1 transition"
    >
      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
        {poll.title}
      </h3>
      <p className="text-sm text-gray-500">
        {poll.isPublic ? "공개 투표" : "비공개 투표"}
      </p>
    </div>
  );
};

export default PollCard;
