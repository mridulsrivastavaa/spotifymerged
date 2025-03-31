import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { generateRandomString, sha256, base64encode } from "../utils/auth.js";
import Charts from "./Charts";

// Environment variables
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

function SpotifyMridul() {
  const [darkMode, setDarkMode] = useState(true);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  // 🎟️ Start Spotify Authorization with PKCE
  const authorizeUser = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    // Save code verifier to local storage for later
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
        scope: "user-read-private user-read-email user-top-read", // Added user-top-read
      });

      console.log("🔗 Redirecting to:", authUrl); // ✅ Add this to check URL
    // Redirect user to Spotify for login
    window.location.href = authUrl;
  };

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

    console.log("✅ Access Token:", access_token);
    setToken(access_token);
    localStorage.setItem("spotify_access_token", access_token);
  };

  // 👤 Fetch User Profile Data
  const getUserProfile = async () => {
    if (!token) return;

    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUserData(response.data);
  };

  // 🎧 Fetch Top Artists
  const getTopArtists = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=5",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTopArtists(response.data.items);
  };

  // 🎵 Fetch Top Tracks
  const getTopTracks = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?limit=20",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTopTracks(response.data.items);
  };

  // 🔄 Handle Callback after Login
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log("✅ Authorization Code Received:", code);
      getAccessToken(code);
    } else {
      console.log("❌ No authorization code found.");
      const storedToken = localStorage.getItem("spotify_access_token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  // 🎯 Fetch User Data, Artists & Tracks when Token is Available
  useEffect(() => {
    if (token) {
      getUserProfile();
      getTopArtists(); // Fetch artists
      getTopTracks(); // Fetch tracks
    }
  }, [token]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        backgroundColor: darkMode ? "#121212" : "#f5f5f5", // Dark/Light background
        color: darkMode ? "#ffffff" : "#000000", // Dark/Light text color
        minHeight: "100vh",
      }}
    >
      <h1>🎧 Spotify Dashboard</h1>
  
      {/* 🌑 Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: darkMode ? "#1db954" : "#333",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {darkMode ? "☀️ Light Mode" : "🌑 Dark Mode"}
      </button>
  
      {!token ? (
        <button
          onClick={authorizeUser}
          style={{
            padding: "10px 20px",
            backgroundColor: darkMode ? "#1db954" : "#333",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login with Spotify
        </button>
      ) : (
        <>
          <h2>Welcome, {userData?.display_name || "User"}!</h2>
          <p>Email: {userData?.email}</p>
          <p>Country: {userData?.country}</p>
          <p>Product Type: {userData?.product}</p>
  
          {/* 🎨 Display Charts when Data is Available */}
          {topArtists.length > 0 && topTracks.length > 0 && (
            <Charts topArtists={topArtists} topTracks={topTracks} />
          )}
        </>
      )}
    </div>
  );  
}

export default SpotifyMridul ;
