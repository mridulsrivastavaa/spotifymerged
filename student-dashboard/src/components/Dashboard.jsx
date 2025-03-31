// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import SpotifySection from "./SpotifySection";
import Weather from "./Weather"; // Renamed from WeatherWidget
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
  const [token, setToken] = useState(null);
  const [setIsAuthorized] = useState(false); // ✅ Handle Login Button

  // 🔑 Exchange Authorization Code for Access Token
  const getAccessToken = async (code) => {
    const codeVerifier = localStorage.getItem("code_verifier");

    const data = {
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    };

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(data),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token } = response.data;
      setToken(access_token);
      localStorage.setItem("spotify_access_token", access_token);

      // Prevent page reload after token retrieval
      window.history.replaceState({}, document.title, "/"); // ✅ Prevent reload
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  // 🎟️ Handle Callback and Get Token from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log("✅ Authorization Code Found:", code);
      getAccessToken(code);
    } else {
      const storedToken = localStorage.getItem("spotify_access_token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  // 🎧 Authorize User with PKCE Flow
  const authorizeUser = async () => {
    const generateRandomString = (length) => {
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const values = crypto.getRandomValues(new Uint8Array(length));
      return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    };

    const sha256 = async (plain) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      return window.crypto.subtle.digest("SHA-256", data);
    };

    const base64encode = (input) => {
      return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    };

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    // Save code verifier to local storage
    localStorage.setItem("code_verifier", codeVerifier);

    // Build Spotify authorization URL
    const authUrl =
      `https://accounts.spotify.com/authorize?` +
      qs.stringify({
        client_id: clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        scope: "user-read-private user-read-email user-top-read",
      });

    // Redirect to Spotify for login
    window.location.href = authUrl;
  };

  // 🔄 Only Authorize when Button is Clicked
  const handleLoginClick = () => {
    setIsAuthorized(true); // ✅ Set authorized only when clicked
    authorizeUser(); // Trigger Authorization
  };

  return (
    <div className="dashboard-container bg-[#0D1117] p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* <SpotifySection /> */}
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
