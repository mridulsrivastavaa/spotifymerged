// src/components/SpotifySection.jsx
import React, { useEffect, useState } from "react";
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
import axios from "axios";

const SpotifySection = ({ token }) => {
  const [topGenres, setTopGenres] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const COLORS = ["#1DB954", "#17A74A", "#14833C", "#11712E", "#0F5F21"];

  // 🎧 Fetch Spotify Data
  const fetchSpotifyData = async () => {
    try {
      // Top Artists
      const artistResponse = await axios.get(
        "https://api.spotify.com/v1/me/top/artists?limit=5",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTopArtists(artistResponse.data.items);

      // Top Tracks
      const trackResponse = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?limit=5",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTopTracks(trackResponse.data.items);

      // Extract Genre Data from Top Artists
      const genreCounts = {};
      artistResponse.data.items.forEach((artist) => {
        artist.genres.forEach((genre) => {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });
      });

      const genreData = Object.keys(genreCounts).map((genre) => ({
        name: genre,
        value: genreCounts[genre],
      }));

      setTopGenres(genreData);
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    }
  };

  // Fetch Data when Component Mounts
  useEffect(() => {
    if (token) {
      fetchSpotifyData();
    }
  }, [token]);

  return (
    <div className="bg-gray-900 rounded-lg shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Spotify Statistics 🎧
      </h2>

      {/* 🔄 Refresh Button */}
      <button
        onClick={fetchSpotifyData}
        className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600"
      >
        🔄 Refresh Data
      </button>

      {/* Genre Distribution Pie Chart */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-white mb-4 text-center">
          Genre Distribution
        </h3>
        <div className="w-full h-72 drop-shadow-xl">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={topGenres}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {topGenres.map((entry, index) => (
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
          Top Tracks
        </h3>
        <div className="w-full h-72 drop-shadow-xl">
          <ResponsiveContainer>
            <BarChart data={topTracks.map((track) => ({ name: track.name, plays: track.popularity }))}>
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
            <BarChart
              data={topArtists.map((artist) => ({
                name: artist.name,
                streams: artist.popularity,
              }))}
            >
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
