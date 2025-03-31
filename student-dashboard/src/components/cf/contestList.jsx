import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios helps in API calls

function Page1() {
  const [contests, setContests] = useState([]); // Stores the list of contests
  const [error, setError] = useState(null); // Stores any API errors

  // Fetches the list of contests from Codeforces API
  function fetchContests() {
    axios
      .get("https://codeforces.com/api/contest.list?gym=false")
      .then((response) => {
        if (response.data.status === "OK") {
          setContests(response.data.result); // Set contest data
          setError(null); // Clear errors
        } else {
          setError("Failed to fetch contests.");
          setContests([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching contests:", error);
        setError("Error fetching contest data.");
        setContests([]);
      });
  }

  useEffect(() => {
    fetchContests(); // Fetch contests when the component loads
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Codeforces Contest List</h1>
      <button onClick={fetchContests} style={{ marginBottom: "20px" }}>
        Refresh Contest List
      </button>

      {/* Error Handling */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Displaying contest list */}
      {contests.length > 0 ? (
        <ul>
          {contests.map((contest) => (
            <li key={contest.id}>
              <strong>{contest.name}</strong> - {new Date(contest.startTimeSeconds * 1000).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No contests found.</p>
      )}
    </div>
  );
}

export default Page1;
