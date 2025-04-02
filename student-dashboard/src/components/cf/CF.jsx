import React, { useState } from "react";
import axios from "axios";

function Page1() {
  const [data, setData] = useState(null);
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  function handleChange(event) {
    setHandle(event.target.value);
  }

  // Fetch data from Codeforces API
  async function onclickhandel() {
    if (handle.trim() === "") {
      alert("Please enter a valid Codeforces handle.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://codeforces.com/api/user.info?handles=${handle}`
      );

      if (response.data.status === "OK") {
        setData(response.data.result[0]);
      } else {
        setData(null);
        setError("User not found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Codeforces User Info
      </h1>

      {/* Input & Button */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          value={handle}
          onChange={handleChange}
          placeholder="Enter Codeforces handle"
          style={{
            padding: "10px",
            width: "80%",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={onclickhandel}
          disabled={loading}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            backgroundColor: loading ? "#ccc" : "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Fetching..." : "Fetch Info"}
        </button>
      </div>

      {/* Loading and Error State */}
      {loading && (
        <p style={{ textAlign: "center", color: "#888" }}>Loading...</p>
      )}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}

      {/* Display User Info */}
      {data && (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src={data.avatar}
              alt={data.handle}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "3px solid #4caf50",
              }}
            />
            <h2 style={{ margin: "10px 0", color: "#333" }}>{data.handle}</h2>
            <p
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                display: "inline-block",
              }}
            >
              {data.rank.toUpperCase()}
            </p>
          </div>

          <div
            style={{
              textAlign: "left",
              lineHeight: "1.6",
              color: "#555",
            }}
          >
            <p>
              <strong>Rating:</strong> {data.rating} (Max: {data.maxRating})
            </p>
            <p>
              <strong>Max Rank:</strong> {data.maxRank}
            </p>
            <p>
              <strong>Friends:</strong> {data.friendOfCount}
            </p>
            <p>
              <strong>Organization:</strong>{" "}
              {data.organization || "Not Available"}
            </p>
            <p>
              <strong>Last Online:</strong>{" "}
              {new Date(data.lastOnlineTimeSeconds * 1000).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {!data && !loading && !error && (
        <p
          style={{
            textAlign: "center",
            color: "#777",
            marginTop: "20px",
          }}
        >
          Enter a handle and press Fetch to view details.
        </p>
      )}
    </div>
  );
}

export default Page1;
