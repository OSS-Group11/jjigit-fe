// 차트 시각화 컴포넌트 코드

import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Trophy, Users, TrendingUp } from "lucide-react";

// Chart.js 필수 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// ⭐ 옵션별 색상 팔레트
const COLORS = [
  "#8B5CF6", // Purple
  "#3B82F6", // Blue
  "#EC4899", // Pink
  "#10B981", // Emerald
  "#F59E0B", // Amber
];

const PollResultsChart = ({ pollData }) => {
  const { options } = pollData;

  // 옵션 정렬
  const sortedOptions = [...options].sort(
    (a, b) => (a.optionOrder || 0) - (b.optionOrder || 0)
  );

  const totalVotes = sortedOptions.reduce(
    (sum, opt) => sum + (opt.voteCount || 0),
    0
  );

  // 최다 득표 옵션 찾기
  const winningOption = sortedOptions.reduce((max, opt) =>
    (opt.voteCount || 0) > (max.voteCount || 0) ? opt : max
  , sortedOptions[0]);

  const winningVotes = winningOption?.voteCount || 0;
  const winningPercentage = totalVotes > 0
    ? ((winningVotes / totalVotes) * 100).toFixed(1)
    : 0;

  // 인사이트 메시지
  const getInsight = () => {
    if (totalVotes === 0) return "아직 투표가 없습니다";
    if (winningPercentage >= 70) return "압도적 우위!";
    if (winningPercentage >= 50) return "과반 득표";
    if (winningPercentage >= 40) return "선두 유지";
    return "박빙 승부";
  };

  const backgroundColors = sortedOptions.map(
    (_, idx) => COLORS[idx % COLORS.length] + "CC"
  );
  const borderColors = sortedOptions.map(
    (_, idx) => COLORS[idx % COLORS.length]
  );

  // 막대 그래프 데이터
  const barData = {
    labels: sortedOptions.map((opt) => opt.optionText || opt.text),
    datasets: [
      {
        label: "투표 수",
        data: sortedOptions.map((opt) => opt.voteCount || 0),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  // 도넛 차트 데이터
  const doughnutData = {
    labels: sortedOptions.map((opt) => opt.optionText || opt.text),
    datasets: [
      {
        data: sortedOptions.map((opt) => opt.voteCount || 0),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "투표 분포",
        font: { size: 18, weight: "bold" },
        color: "#1f2937",
        padding: 15,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, font: { size: 12 } },
      },
      x: {
        ticks: { font: { size: 13 } },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: { size: 11 },
          padding: 10,
        },
      },
      title: {
        display: true,
        text: "득표율",
        font: { size: 18, weight: "bold" },
        color: "#1f2937",
        padding: 15,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* 📊 통계 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 총 투표 수 */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-500 rounded-full p-2">
              <Users size={20} className="text-white" />
            </div>
            <h3 className="text-sm font-semibold text-purple-900">총 투표 수</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">{totalVotes}표</p>
        </div>

        {/* 최다 득표 */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-500 rounded-full p-2">
              <Trophy size={20} className="text-white" />
            </div>
            <h3 className="text-sm font-semibold text-amber-900">최다 득표</h3>
          </div>
          <p className="text-2xl font-bold text-amber-600 truncate">
            {winningOption?.optionText || winningOption?.text}
          </p>
          <p className="text-sm text-amber-700 mt-1">{winningVotes}표 ({winningPercentage}%)</p>
        </div>

        {/* 인사이트 */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500 rounded-full p-2">
              <TrendingUp size={20} className="text-white" />
            </div>
            <h3 className="text-sm font-semibold text-blue-900">경쟁 현황</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">{getInsight()}</p>
          <p className="text-sm text-blue-700 mt-1">
            {sortedOptions.length}개 옵션 중
          </p>
        </div>
      </div>

      {/* 📈 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 막대 그래프 (2/3) */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
          <div style={{ height: "350px" }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* 도넛 차트 (1/3) */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
          <div style={{ height: "350px" }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* 📋 상세 결과 리스트 */}
      <div className="space-y-3">
        {sortedOptions.map((opt, idx) => {
          const voteCount = opt.voteCount || 0;
          const percentage =
            totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(1) : 0;
          const isWinner = opt.optionId === winningOption?.optionId;

          return (
            <div
              key={opt.optionId || opt.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 shadow-sm transition-all ${
                isWinner
                  ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-amber-300"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                {isWinner && <Trophy size={18} className="text-amber-500" />}
                <span className={`font-medium text-gray-800 ${isWinner ? "text-lg" : "text-base"}`}>
                  {opt.optionText || opt.text}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="block text-sm text-gray-600">{voteCount}표</span>
                  <span
                    className="block text-sm font-bold"
                    style={{ color: COLORS[idx % COLORS.length] }}
                  >
                    {percentage}%
                  </span>
                </div>

                {/* 진행바 */}
                <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: COLORS[idx % COLORS.length],
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollResultsChart;
