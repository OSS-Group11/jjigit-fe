/*(기능 소개 슬라이드)*/
// src/components/FeatureCarousel.js
import React, { useEffect, useState } from "react";

const slides = [
  {
    title: "📊 실시간 투표율 그래프",
    desc: "Chart.js 기반으로 투표 결과를 실시간으로 시각화합니다.",
  },
  {
    title: "🤖 LLM 기반 주제 추천",
    desc: "회의 안건이 떠오르지 않을 때 AI가 주제를 제안해 줍니다.",
  },
  {
    title: "💬 옵션별 댓글 토론",
    desc: "각 선택지에 댓글을 달고 토론을 이어갈 수 있습니다.",
  },
];

function FeatureCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <div className="border rounded-xl p-6 shadow-sm h-full flex flex-col justify-between bg-white">
      <div>
        <h2 className="text-xl font-semibold mb-2">{slide.title}</h2>
        <p className="text-gray-600 text-sm">{slide.desc}</p>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default FeatureCarousel;
