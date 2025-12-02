// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Link2,
  BarChart3,
  MessageSquare,
  Zap,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import SplashComponent from "../components/SplashComponent";
import PollList from "../components/PollList";
import PollSearchBar from "../components/PollSearchBar";
import FeatureCarousel from "../components/FeatureCarousel";
import FeatureSections from "../components/FeatureSections";
import api from "../api/axios";

const HomePage = () => {
  // Splash 로딩
  const [isLoading, setIsLoading] = useState(false);

  // 투표 목록/검색 상태
  const [polls, setPolls] = useState([]);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const TARGET_PATH = "/create";
  const SPLASH_DURATION = 1500; // 1.5초

  // 초기 전체 투표 목록 불러오기
  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async (q) => {
    try {
      const response = await api.get("/api/polls", {
        params: q ? { keyword: q } : {},
      });

      setPolls(response.data.polls || []);
    } catch (error) {
      console.error("Failed to fetch polls:", error);
      alert("투표 목록을 가져오는 중 오류가 발생했습니다.");
    }
  };

  const handleSearch = () => {
    const q = keyword.trim();
    fetchPolls(q || undefined);
  };

  // 스플래시 후 이동
  const handleCreatePollClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(TARGET_PATH);
    }, SPLASH_DURATION);
  };

  const handleCreatePoll = () => navigate("/create");
  const handleLLMTopic = () => navigate("/create?with=llm-topic");

  // Splash 표시 중
  if (isLoading) {
    return <SplashComponent text="JJIGIT" />;
  }

  return (
    <div className="flex flex-col">
      {/* ⭐ 신규 Hero Section 영역 */}
      <section className="flex flex-col md:flex-row px-8 py-16 gap-12 max-w-7xl mx-auto">
        {/* 좌측 텍스트 */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug">
            팀의 선택을 빠르게 모으는
            <br />
            실시간 투표 플랫폼,{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              JJIGIT
            </span>
          </h1>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            회의, 스터디, 동아리 투표를 링크 하나로 해결하세요.
            <br />
            실시간 그래프와 댓글 토론으로 더 나은 결정을 도와줍니다.
          </p>

          {/* 버튼들 */}
          <div className="flex gap-3 mt-3">
            <button
              onClick={handleCreatePoll}
              className="px-6 py-3 rounded-full bg-indigo-600 text-white text-sm md:text-base hover:bg-indigo-700 transition"
            >
              투표 만들기
            </button>

            <button
              onClick={handleLLMTopic}
              className="px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 text-sm md:text-base hover:bg-indigo-50 transition"
            >
              LLM 기반 주제 추천받기
            </button>
          </div>
        </div>

        {/* 우측 슬라이드 */}
        <div className="flex-1">
          <FeatureCarousel />
        </div>
      </section>

      {/* ⬇ 아래로 주요 기능 설명 */}
      <FeatureSections />

      {/* ------------------------------------------------------------ */}
      {/* 기존 HomePage 콘텐츠(검색, 투표 목록, Feature 카드 등) 유지 */}
      {/* ------------------------------------------------------------ */}

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Highlight Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100/50 backdrop-blur-sm rounded-full text-indigo-700 text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>오픈소스 실시간 투표 플랫폼</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            투표는 쉽고 빠르게,
            <br />
            Jjigit
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            복잡한 설문 도구는 잊으세요. Jjigit은 비용이나 복잡성 없이 빠르고,
            <br />
            직관적이며 데이터 기반의 결정을 돕는 완전한 오픈소스 투표 플랫폼입니다.
          </p>

          <button
            onClick={handleCreatePollClick}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all"
          >
            지금 바로 투표 만들기
            <ChevronRight
              className="group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </button>
        </div>

        {/* 검색 + 투표 목록 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">진행 중인 투표</h2>
          <p className="text-gray-600 mb-6">
            공개된 투표를 검색하거나, 아래 목록에서 바로 참여해 보세요.
          </p>

          <PollSearchBar keyword={keyword} onChange={setKeyword} onSearch={handleSearch} />
          <PollList polls={polls} />
        </section>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <FeatureCard
            icon={<Sparkles className="text-indigo-600" size={28} />}
            title="오픈소스 & 무료"
            description="모든 기능을 광고 없이 무료로 사용할 수 있습니다."
          />
          <FeatureCard
            icon={<Zap className="text-purple-600" size={28} />}
            title="LLM 기반 추천"
            description="LLM 기반 주제 제안 기능으로 편리하게 투표를 만듭니다."
          />
          <FeatureCard
            icon={<Link2 className="text-pink-600" size={28} />}
            title="간편한 공유"
            description="링크 공유만으로 실시간 차트 시각화를 제공합니다."
          />
        </div>

        {/* Differentiation Section */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 border border-gray-200/50 shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Jjigit의 차별화된 경험
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <DifferentiationCard
              icon={<BarChart3 className="text-indigo-600" size={24} />}
              title="실시간 시각화"
              description="투표 결과를 실시간 차트로 시각화합니다."
            />

            <DifferentiationCard
              icon={<MessageSquare className="text-purple-600" size={24} />}
              title="댓글 장단점 요약"
              description="LLM이 댓글의 주요 포인트를 자동 요약해드립니다."
            />

            <DifferentiationCard
              icon={<Link2 className="text-pink-600" size={24} />}
              title="링크 하나로 끝"
              description="회원가입 없이도 링크로 투표 생성 및 공유가 가능합니다."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="group bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer">
    <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const DifferentiationCard = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default HomePage;
