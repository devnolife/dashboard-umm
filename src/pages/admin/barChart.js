// src/components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const labels = data.map((item) => item.namaFakultas);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Jumlah Mahasiswa',
        data: data.map((item) => item.jumlah),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Sudah Upload',
        data: data.map((item) => item.sudahUpload),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
      {
        label: 'Prestasi Akademik',
        data: data.map((item) => item.prestasiAkademik),
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
      },
      {
        label: 'Prestasi Hafiz',
        data: data.map((item) => item.prestasiHafiz),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Rekap Mahasiswa per Fakultas',
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
