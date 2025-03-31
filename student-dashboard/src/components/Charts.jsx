// src/components/Charts.jsx
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register required chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Charts = ({ topArtists, topTracks }) => {
  // Prepare data for Top Artists Bar Chart
  const artistLabels = topArtists.map((artist) => artist.name);
  const artistPopularity = topArtists.map((artist) => artist.popularity);

  const artistChartData = {
    labels: artistLabels,
    datasets: [
      {
        label: "Popularity",
        data: artistPopularity,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Top Tracks Pie Chart
  const trackLabels = topTracks.map((track) => track.name);
  const trackPopularity = topTracks.map((track) => track.popularity);

  const trackChartData = {
    labels: trackLabels,
    datasets: [
      {
        label: "Popularity",
        data: trackPopularity,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", paddingTop: "20px" }}>
      <h2>🎨 Top Artists Popularity</h2>
      <Bar data={artistChartData} options={{ responsive: true }} />

      <h2 style={{ marginTop: "40px" }}>🎵 Top Tracks Popularity</h2>
      <Pie data={trackChartData} options={{ responsive: true }} />
    </div>
  );
};

export default Charts;
