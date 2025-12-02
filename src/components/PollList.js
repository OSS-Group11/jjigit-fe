// src/components/PollList.js
import React from "react";
import PollCard from "./PollCard";

const PollList = ({ polls }) => {
  if (!polls || polls.length === 0) {
    return <p className="text-center text-gray-500">표시할 투표가 없습니다.</p>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default PollList;
