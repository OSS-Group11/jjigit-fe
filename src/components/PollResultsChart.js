import React from 'react';
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
  const { options, results } = pollData;

  const data = {
    labels: options.map(opt => opt.text), // 옵션 텍스트
    datasets: [
      {
        label: '투표 수',
        data: options.map(opt => results[opt.id] || 0), // 각 옵션의 투표 수
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const optionsConfig = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: '실시간 투표 결과' },
    },
    scales: {
        y: { beginAtZero: true }
    }
  };
  
  return <Bar data={data} options={optionsConfig} />;
};

export default PollResultsChart;
