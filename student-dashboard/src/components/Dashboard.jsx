// src/components/Dashboard.jsx
import React from "react";
import SpotifySection from "./SpotifySection";
import Weather from "./Weather"; // renamed from WeatherWidget
import Clock from "./Clock";
import IMDBSection from "./IMDBSection";
import CodeforcesWidget from "./CodeforcesWidget";
import KaggleCompetitions from "./KaggleCompetitions";

const Dashboard = () => {
  return (
    <div className="dashboard-container bg-[#0D1117] p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <SpotifySection />
        </div>

        {/* Center Column */}
        <div className="space-y-4">
          <Clock />
          <IMDBSection />
          <Weather />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <CodeforcesWidget />
          <KaggleCompetitions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
