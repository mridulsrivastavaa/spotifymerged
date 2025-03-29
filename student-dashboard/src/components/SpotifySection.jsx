// src/components/SpotifySection.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const SpotifySection = () => {
  const genreData = [
    { name: "Pop", value: 30 },
    { name: "Hip-Hop", value: 25 },
    { name: "Rock", value: 20 },
    { name: "EDM", value: 15 },
    { name: "Jazz", value: 10 },
  ];

  const songData = [
    { name: "Wavy", plays: 500 },
    { name: "Redrum", plays: 450 },
    { name: "Follow You", plays: 400 },
    { name: "Peekaboo", plays: 350 },
  ];

  const artistData = [
    { name: "Drake", streams: 2000 },
    { name: "Taylor Swift", streams: 1800 },
    { name: "Eminem", streams: 1500 },
    { name: "Billie Eilish", streams: 1300 },
  ];

  const COLORS = ["#1DB954", "#17A74A", "#14833C", "#11712E", "#0F5F21"];

  return (
    <div className="bg-gray-900 rounded-lg shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Spotify Statistics
      </h2>

      {/* Genre Distribution Pie Chart */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-white mb-4 text-center">
          Genre Distribution
        </h3>
        <div className="w-full h-72 drop-shadow-xl">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={genreData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#333", border: "none", color: "#fff" }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: "#fff" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Trending Songs Bar Chart */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-white mb-4 text-center">
          Top Trending Songs
        </h3>
        <div className="w-full h-72 drop-shadow-xl">
          <ResponsiveContainer>
            <BarChart data={songData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "#333", border: "none", color: "#fff" }} />
              <Bar dataKey="plays" fill="#1DB954" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Artists Bar Chart */}
      <div>
        <h3 className="text-2xl font-semibold text-white mb-4 text-center">
          Top Artists
        </h3>
        <div className="w-full h-72 drop-shadow-xl">
          <ResponsiveContainer>
            <BarChart data={artistData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "#333", border: "none", color: "#fff" }} />
              <Bar dataKey="streams" fill="#17A74A" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SpotifySection;
