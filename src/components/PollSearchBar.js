// src/components/PollSearchBar.js
import React from "react";

const PollSearchBar = ({ keyword, onChange, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="투표를 검색해 보세요"
        className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="button"
        onClick={onSearch}
        className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
      >
        검색
      </button>
    </div>
  );
};

export default PollSearchBar;
