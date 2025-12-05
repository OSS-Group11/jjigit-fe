/*스크롤 시 기능 소개*/ 

// src/components/FeatureSections.js
import React from "react";
import { motion } from "framer-motion";

const blocks = [
  {
    icon: "📈",
    title: "한눈에 보이는 실시간 그래프",
    desc: "투표가 들어오는 즉시 결괏값이 업데이트되므로 회의 중에도 바로 확인할 수 있습니다.",
    accent: "from-purple-500/10 to-indigo-500/10",
  },
  {
    icon: "🧠",
    title: "AI가 도와주는 안건 정리",
    desc: "찬반 의견을 모아서 핵심만 요약해 주는 기능을 준비하고 있습니다.",
    accent: "from-pink-500/10 to-purple-500/10",
  },
  {
    icon: "🌐",
    title: "링크 하나로 어디서나",
    desc: "로그인 없이도 링크만 있으면 투표에 참여하고 결과를 확인할 수 있습니다.",
    accent: "from-blue-400/10 to-purple-400/10",
  },
];

function FeatureSections() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto space-y-10 px-6">

        {blocks.map((b, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 150 }}
            className={`
              relative w-full min-h-[170px] md:min-h-[190px]
              rounded-3xl p-7 md:p-9
              flex items-start gap-5
              border border-gray-200/70
              bg-white/70 backdrop-blur-xl shadow-sm
              hover:shadow-xl hover:border-purple-200
              transition-all duration-300
            `}
          >
            {/* Hover-gradient 효과 */}
            <div
              className={`
                absolute inset-0 rounded-3xl pointer-events-none
                opacity-0 group-hover:opacity-100
                bg-gradient-to-br ${b.accent}
                transition-opacity duration-500
              `}
            ></div>

            {/* 아이콘 */}
            <div className="text-4xl md:text-5xl mt-1">{b.icon}</div>

            {/* 텍스트 영역 */}
            <div className="relative z-10">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                {b.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {b.desc}
              </p>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}

export default FeatureSections;
