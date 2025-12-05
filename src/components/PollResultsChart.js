// 차트 시각화 컴포넌트 코드

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js 필수 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ⭐ 옵션별 색상 팔레트 (보라 + 파랑 + 핑크 + 초록 + 주황)
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

  const backgroundColors = sortedOptions.map(
    (_, idx) => COLORS[idx % COLORS.length] + "CC" // 투명도 80%
  );
  const borderColors = sortedOptions.map(
    (_, idx) => COLORS[idx % COLORS.length]
  );

  const data = {
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

  const optionsConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `실시간 투표 결과 (총 ${totalVotes}표)`,
        font: { size: 20, weight: "bold" },
        color: "#1f2937",
        padding: 20,
        align: "center",
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

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mx-auto shadow-lg">
      {/* ⭐ 차트 중앙 정렬 */}
      <div className="flex justify-center mb-6">
        <div style={{ height: "380px", width: "100%" }}>
          <Bar data={data} options={optionsConfig} />
        </div>
      </div>

      {/* ⭐ 상세 결과 리스트 */}
      <div className="mt-6 space-y-3">
        {sortedOptions.map((opt, idx) => {
          const voteCount = opt.voteCount || 0;
          const percentage =
            totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(1) : 0;

          return (
            <div
              key={opt.optionId || opt.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
            >
              <span className="font-medium text-gray-800 text-base">
                {opt.optionText || opt.text}
              </span>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{voteCount}표</span>

                {/* ⭐ 옵션별 색상 동일 적용 */}
                <span
                  className="text-sm font-bold"
                  style={{ color: COLORS[idx % COLORS.length] }}
                >
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollResultsChart;
