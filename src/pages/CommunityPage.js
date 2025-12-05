// src/pages/CommunityPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import PollCard from "../components/PollCard";

export default function CommunityPage() {
  const navigate = useNavigate();

  const [polls, setPolls] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("active"); // 기본은 진행중
  const [sortBy, setSortBy] = useState("recent"); // 기본 정렬
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus, sortBy]);

  async function fetchPolls() {
    setLoading(true);
    try {
      // 백엔드 API: GET /api/polls?page=0&size=20&sort=createdAt,desc
      // sortBy를 백엔드 형식으로 변환
      let sortParam = "createdAt,desc"; // 기본값
      if (sortBy === "recent") {
        sortParam = "createdAt,desc";
      } else if (sortBy === "popular") {
        sortParam = "totalVotes,desc"; // 백엔드에 totalVotes 필드가 있다면
      } else if (sortBy === "votes") {
        sortParam = "totalVotes,desc";
      }

      const res = await axios.get(`/api/polls`, {
        params: {
          page: 0,
          size: 20,
          sort: sortParam
        },
      });

      // 백엔드 응답 형태: { polls: [...], currentPage, totalPages, ... }
      const data = res.data.polls || [];
      setPolls(data);
    } catch (err) {
      console.error("Failed to fetch polls from API:", err);
      // 페일백: 예시 데이터 표시
      setPolls(getExamplePolls());
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = () => {
    const token = localStorage.getItem("jjigit-token");
    if (!token) {
      alert("투표를 생성하려면 로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    navigate("/create");
  };

  const handleLLMTopic = () => {const token = localStorage.getItem("jjigit-token");
    if (!token) {
      alert("투표를LLM 기반 주제 추천 기능을 사용하려면 로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    navigate("/create?with=llm-topic");
  };

  // 필터링 (검색어 포함)
  const filteredPolls = polls.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const title = (p.title || "").toLowerCase();
    const desc = (p.description || "").toLowerCase();
    return title.includes(q) || desc.includes(q);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 상단바 아래 여백 */}
      <div className="pt-20">
        {/* 헤더 섹션 */}
        <div className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-6 py-6 md:py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
              커뮤니티 투표
            </h1>
            <p className="text-gray-600">
              진행 중인 투표에 참여하고, 다른 사람들의 의견을 확인해보세요
            </p>
          </div>
        </div>

        {/* 검색 및 필터 섹션 */}
        <div className="container mx-auto px-6 py-6">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* 검색바 */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="투표 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-3 pl-12 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    🔍
                  </span>
                </div>
              </div>

              {/* 필터 및 정렬 */}
              <div className="flex items-center gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none bg-white cursor-pointer text-sm"
                >
                  <option value="all">모든 상태</option>
                  <option value="active">진행 중</option>
                  <option value="closed">종료됨</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none bg-white cursor-pointer text-sm"
                >
                  <option value="recent">최신순</option>
                  <option value="popular">인기순</option>
                  <option value="votes">투표수순</option>
                </select>
              </div>

              {/* 우측 액션 버튼 (모바일에서는 줄 바꿈) */}
              <div className="flex gap-3 ml-auto">
                <button
                  onClick={handleLLMTopic}
                  className="px-4 py-2 rounded-full border border-purple-600 text-purple-600 text-sm hover:bg-purple-50"
                >
                  LLM 주제 추천
                </button>

                <button
                  onClick={handleCreate}
                  className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm hover:bg-purple-700"
                >
                  새 투표 만들기
                </button>
              </div>
            </div>
          </div>

          {/* 투표 카드 그리드 */}
          <div>
            {loading ? (
              <div className="text-center py-12 text-gray-500">로딩 중...</div>
            ) : filteredPolls.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPolls.map((poll) => (
                  <PollCard key={poll.id} poll={normalizePoll(poll)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">검색 결과가 없습니다</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 헬퍼: 예시 데이터 (API 실패 시) ---------- */
function getExamplePolls() {
  return [
    {
      id: 1,
      title: "팀 회식 장소 투표",
      description: "이번 달 팀 회식 장소를 결정합니다. 선호하는 음식 종류에 투표해주세요!",
      thumbnailUrl: "/images/restaurant-vote.jpg",
      author: "김철수",
      createdAt: "2025-12-01T10:00:00Z",
      status: "active",
      totalVotes: 47,
      totalComments: 12,
      options: ["한식", "중식", "일식", "양식"],
      votes: { 한식: 15, 중식: 12, 일식: 10, 양식: 10 },
      isPublic: true,
    },
    {
      id: 2,
      title: "프로젝트 기술 스택 선정",
      description: "새 프로젝트에 사용할 프론트엔드 프레임워크를 결정합니다.",
      thumbnailUrl: "/images/tech-stack.jpg",
      author: "이영희",
      createdAt: "2025-12-02T14:30:00Z",
      status: "active",
      totalVotes: 89,
      totalComments: 24,
      options: ["React", "Vue", "Angular", "Svelte"],
      votes: { React: 45, Vue: 25, Angular: 10, Svelte: 9 },
      isPublic: true,
    },
    {
      id: 3,
      title: "스터디 시간 조정",
      description: "다음 주 스터디 시간을 조정하려고 합니다. 가능한 시간대에 투표해주세요.",
      thumbnailUrl: "/images/study-time.jpg",
      author: "박민수",
      createdAt: "2025-12-03T09:15:00Z",
      status: "active",
      totalVotes: 32,
      totalComments: 8,
      options: ["평일 저녁", "주말 오전", "주말 오후", "온라인 상시"],
      votes: { "평일 저녁": 12, "주말 오전": 8, "주말 오후": 7, "온라인 상시": 5 },
      isPublic: true,
    },
  ];
}

/* ---------- 헬퍼: API에서 온 poll 구조 정규화 ---------- */
function normalizePoll(p) {
  // 백엔드 응답 필드명을 프론트엔드 형식으로 매핑
  // 백엔드 응답: { pollId, title, isPublic, options: [{optionId, optionText, optionOrder, voteCount}], creatorId, createdAt, totalVotes }
  return {
    id: p.pollId ?? p.id,
    title: p.title ?? "제목 없음",
    description: p.description ?? "",
    thumbnailUrl: null, // 백엔드에 이미지 필드 없음
    isPublic: p.isPublic ?? true,
    totalVotes: p.totalVotes ?? 0,
    createdAt: p.createdAt,
    author: p.creatorId ? `User ${p.creatorId}` : "익명",
    options: p.options ?? [],
    status: "active", // 백엔드에 status 필드가 없으면 기본값
    totalComments: 0, // 백엔드 응답에 없는 필드
  };
}
