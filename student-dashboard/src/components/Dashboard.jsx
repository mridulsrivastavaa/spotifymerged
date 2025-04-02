// src/components/Dashboard.jsx
import React from "react";
import SpotifySection from "./SpotifySection";
import Weather from "./Weather"; // renamed from WeatherWidget
import Clock from "./Clock";
import IMDBSection from "./IMDBSection";
import CodeforcesWidget from "./CodeforcesWidget";
import KaggleCompetitions from "./KaggleCompetitions";
import qs from "qs";
import axios from "axios";
import Codeforces from "./cf/Codeforces";

// Environment variables
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
import MridulSpotify from "./MridulSpotify";


const Dashboard = () => {
  return (
    <div className="dashboard-container bg-[#0D1117] p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
       
          <MridulSpotify />

        </div>

        {/* Center Column */}
        <div className="space-y-4">
          <Clock />
          <IMDBSection />
          <Weather />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <Codeforces />
          <KaggleCompetitions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
