// 차트 시각화 컴포넌트 코드

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js 필수 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PollResultsChart = ({ pollData }) => {
  const { options } = pollData;

  // 백엔드 응답: options: [{optionId, optionText, optionOrder, voteCount}]
  const sortedOptions = [...options].sort((a, b) => (a.optionOrder || 0) - (b.optionOrder || 0));

  const totalVotes = sortedOptions.reduce((sum, opt) => sum + (opt.voteCount || 0), 0);

  const data = {
    labels: sortedOptions.map(opt => opt.optionText || opt.text),
    datasets: [
      {
        label: '투표 수',
        data: sortedOptions.map(opt => opt.voteCount || 0),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',   // indigo
          'rgba(168, 85, 247, 0.8)',   // purple
          'rgba(236, 72, 153, 0.8)',   // pink
          'rgba(59, 130, 246, 0.8)',   // blue
          'rgba(16, 185, 129, 0.8)',   // green
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 2,
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
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#1f2937',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 13,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 max-w-4xl">
      <div style={{ height: '400px' }}>
        <Bar data={data} options={optionsConfig} />
      </div>

      {/* 상세 결과 */}
      <div className="mt-6 space-y-2">
        {sortedOptions.map((opt) => {
          const voteCount = opt.voteCount || 0;
          const percentage = totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(1) : 0;

          return (
            <div key={opt.optionId || opt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-800">{opt.optionText || opt.text}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{voteCount}표</span>
                <span className="text-sm font-semibold text-purple-600">{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollResultsChart;
