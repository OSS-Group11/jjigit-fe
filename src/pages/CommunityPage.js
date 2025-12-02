// src/pages/CommunityPage.js
import React, { useEffect, useState } from "react";
import PollSearchBar from "../components/PollSearchBar";
import PollCard from "../components/PollCard";
import axios from "../api/axios"; // 이미 있는 axios 인스턴스 사용
import { useNavigate } from "react-router-dom";

function CommunityPage() {
  const [polls, setPolls] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 진행 중인 투표 목록 불러오기 (백엔드에 /polls/active 같은 API 마련)
    axios
      .get("/polls/active")
      .then((res) => setPolls(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = polls.filter(
    (p) =>
      p.title.toLowerCase().includes(keyword.toLowerCase()) ||
      (p.description || "")
        .toLowerCase()
        .includes(keyword.toLowerCase())
  );

  const handleLLMTopic = () => navigate("/create?with=llm-topic");

  return (
    <div className="flex px-8 py-8 gap-6">
      {/* 중앙: 검색 + 카드 리스트 */}
      <div className="flex-1 flex flex-col gap-4">
        {/* 중앙 상단 검색 기능 */}
        <div className="w-full max-w-md mx-auto">
          <PollSearchBar
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* 진행중 투표 카드 리스트 */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">
              empty
            </div>
          ) : (
            filtered.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))
          )}
        </div>
      </div>

      {/* 우측 버튼 영역 */}
      <aside className="w-48 flex flex-col gap-3">
        <button
          onClick={() => navigate("/create")}
          className="px-3 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          투표하기
        </button>
        <button
          onClick={handleLLMTopic}
          className="px-3 py-2 rounded border border-blue-600 text-blue-600 text-sm hover:bg-blue-50"
        >
          LLM 기반 주제 추천
        </button>
      </aside>
    </div>
  );
}

export default CommunityPage;
