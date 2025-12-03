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
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SplashComponent from "../components/SplashComponent";
import FeatureSections from "../components/FeatureSections";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreatePoll = () => {
    const token = localStorage.getItem("jjigit-token");
    if (!token) {
      alert("투표를 생성하려면 로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    navigate("/create");
  };

  const handleLLMTopic = () => navigate("/create?with=llm-topic");

  if (isLoading) return <SplashComponent text="JJIGIT" />;

  return (
    <div className="flex flex-col">
      {/* ⭐ Hero Section + 슬라이더 */}
      <section
        className="
          flex flex-col md:flex-row
          px-12 py-20
          gap-16
          max-w-[1000px] mx-auto w-full
        "
        >
        {/* 좌측 텍스트 애니메이션 */}
        <motion.div
          className="flex-1 flex flex-col gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-snug">
            팀의 선택을 빠르게 모으는
            <br />
            실시간 투표 플랫폼{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              JJIGIT
            </span>
          </h1>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            회의, 스터디, 동아리 투표를 링크 하나로 해결하세요.
            <br />
            실시간 그래프와 댓글 토론으로 더 나은 결정을 도와줍니다.
          </p>

          {/* 버튼 애니메이션 */}
          <div className="flex gap-3 mt-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreatePoll}
              className="px-6 py-3 rounded-full bg-purple-600 text-white text-sm md:text-base hover:bg-purple-700 transition"
            >
              투표 만들기
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLLMTopic}
              className="px-6 py-3 rounded-full border border-purple-600 text-purple-600 text-sm md:text-base hover:bg-purple-50 transition"
            >
              LLM 기반 주제 추천받기
            </motion.button>
          </div>
        </motion.div>

        {/* 우측 슬라이더 */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FeatureSlider />
        </motion.div>
      </section>

      {/* FeatureSections (스크롤 진입 시 애니메이션) */}
      <ScrollReveal>
        <FeatureSections />
      </ScrollReveal>

      {/* 기존 Highlight + Differentiation Section 유지 */}
      <ScrollReveal>
        <HomeHighlightSection handleCreatePoll={handleCreatePoll} />
      </ScrollReveal>

      <ScrollReveal>
        <DifferentiationSection />
      </ScrollReveal>
    </div>
  );
};

export default HomePage;

/* -------------------------------------------------------
   ⭐ 슬라이드 컨테이너에 고정 높이 + 자동 슬라이드 FeatureSlider
---------------------------------------------------------*/
const FeatureSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      // icon: "🤖",
      title: "LLM 기반 주제 추천",
      description: "회의 안건이 떠오르지 않을 때 AI가 주제를 제안해 줍니다.",
      image: "/images/ai-suggestion.svg", // 이미지 추가
    },
    {
      // icon: "📊",
      title: "한눈에 보이는 실시간 그래프",
      description:
        "투표가 들어오는 즉시 결괏값이 업데이트되므로 회의 중에도 바로 확인할 수 있습니다.",
      image: "/images/realtime-chart.svg",
    },
    {
      // icon: "🧠",
      title: "AI가 도와주는 안건 정리",
      description:
        "찬반 의견을 모아서 핵심만 요약해 주는 기능을 준비하고 있습니다.",
      image: "/images/ai-summary.svg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50">
      {/* 슬라이드 전체 래퍼 */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="min-w-full h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-12"
          >
            {/* 왼쪽: 텍스트 */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="text-6xl">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-lg">
                {feature.description}
              </p>
            </div>
            {/* 오른쪽: 이미지 */}
            <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-64 h-64 md:w-80 md:h-80 object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-purple-600" : "w-2 bg-purple-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------
   ⭐ 스크롤 트리거 효과 공용 컴포넌트
---------------------------------------------------------*/
const ScrollReveal = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.18,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------------------------
   ⭐ 기존 Highlight Section
---------------------------------------------------------*/
const HomeHighlightSection = ({ handleCreatePoll }) => (
  <div className="max-w-7xl mx-auto px-6 py-20">
    <div className="text-center mb-24">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100/50 backdrop-blur-sm rounded-full text-purple-700 text-sm font-medium mb-8">
        <Sparkles size={16} />
        <span>오픈소스 실시간 투표 플랫폼</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
        투표는 쉽고 빠르게,
        <br />
        Jjigit
      </h1>

      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
        복잡한 설문 도구는 잊으세요. Jjigit은 비용이나 복잡성 없이 빠르고,
        <br />
        직관적이며 데이터 기반의 결정을 돕는 완전한 오픈소스 투표 플랫폼입니다.
      </p>

      <motion.button
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleCreatePoll}
        className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl transition-all"
      >
        지금 바로 투표 만들기
        <ChevronRight
          className="group-hover:translate-x-1 transition-transform"
          size={20}
        />
      </motion.button>
    </div>
  </div>
);

/* -------------------------------------------------------
   ⭐ 기존 Differentiation Section
---------------------------------------------------------*/
const DifferentiationSection = () => (
  <div className="max-w-7xl mx-auto px-6 pb-24">
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 border border-gray-200/50 shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Jjigit의 차별화된 경험
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <BarChart3 className="text-purple-600" size={24} />,
            title: "실시간 시각화",
            description: "투표 결과를 실시간 차트로 시각화합니다.",
          },
          {
            icon: <MessageSquare className="text-indigo-600" size={24} />,
            title: "댓글 장단점 요약",
            description: "LLM이 댓글의 주요 포인트를 자동 요약해드립니다.",
          },
          {
            icon: <Link2 className="text-pink-600" size={24} />,
            title: "링크 하나로 끝",
            description:
              "회원가입 없이도 링크로 투표 생성 및 공유가 가능합니다.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="text-center transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);
