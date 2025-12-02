/*스크롤 시 기능 소개*/
// src/components/FeatureSections.js
import React from "react";

const blocks = [
  {
    title: "📈 한눈에 보이는 실시간 그래프",
    desc: "투표가 들어오는 즉시 결괏값이 업데이트되므로 회의 중에도 바로 확인할 수 있습니다.",
  },
  {
    title: "🧠 AI가 도와주는 안건 정리",
    desc: "찬반 의견을 모아서 핵심만 요약해 주는 기능을 준비하고 있습니다.",
  },
  {
    title: "🌐 링크 하나로 어디서나",
    desc: "로그인 없이도 링크만 있으면 투표에 참여하고 결과를 확인할 수 있습니다.",
  },
];

function FeatureSections() {
  return (
    <section className="px-8 pb-12 space-y-4">
      {blocks.map((b) => (
        <div
          key={b.title}
          className="border rounded-lg p-4 flex items-start gap-4 bg-white shadow-sm"
        >
          <div className="text-2xl">{b.title.split(" ")[0]}</div>
          <div>
            <h3 className="font-semibold text-sm md:text-base">
              {b.title}
            </h3>
            <p className="text-gray-600 text-xs md:text-sm mt-1">
              {b.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default FeatureSections;
