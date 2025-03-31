import React, { useEffect, useState } from "react";
import { getAccessTokenFromUrl } from "../hooks/spotifyAuth";
import SpotifyHomePage from "./SpotifyHomePage";
import SpotifyLoginButton from "./SpotifyLoginButton";
import ErrorBoundary from "./ErrorBoundary";

const MridulSpotify = () => {
  const [token, setToken] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("spotify_token");
    window.location.href = "/dashboard";
  };

  useEffect(() => {
    const accessToken = getAccessTokenFromUrl();
    if (accessToken) {
      setToken(accessToken);
      window.location.hash = "";
    }
    console.log("token", accessToken);
  }, []);

  return (
    <ErrorBoundary>
      <div>
        {!token ? (
          <SpotifyLoginButton />
        ) : (
          <SpotifyHomePage token={token} onLogout={handleLogout} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default MridulSpotify;
