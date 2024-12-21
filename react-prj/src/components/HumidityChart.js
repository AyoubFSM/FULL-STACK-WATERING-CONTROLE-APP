// src/components/HumidityChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale);

const HumidityChart = ({ humidityData }) => {
  const data = {
    labels: humidityData.map((_, index) => `Hour ${index + 1}`),
    datasets: [
      {
        label: 'Humidity Level (%)',
        humidityData,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Humidity (%)',
        },
      },
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Time (Hours)',
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default HumidityChart;