import React, { useState} from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

function Page1() {
  const [handle, setHandle] = useState(""); // Stores user handle for fetching submissions
  const [ratingData, setRatingData] = useState({}); // Stores solved problem count by rating
  const [tagData, setTagData] = useState({}); // Stores solved problems by tag
  const [showChart, setShowChart] = useState(false); // Show/Hide charts
  const [loading, setLoading] = useState(false); // Loading indicator

  // Fetch user submissions and calculate solved problems by rating and tags
  const fetchUserSubmissions = () => {
    if (!handle.trim()) {
      alert("Please enter a valid Codeforces handle!");
      return;
    }

    setLoading(true); // Start loading
    axios
      .get(`https://codeforces.com/api/user.status?handle=${handle}`)
      .then((response) => {
        const submissions = response.data.result;
        calculateSolvedByRating(submissions);
        calculateSolvedByTags(submissions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user submissions:", error);
        alert("Failed to fetch data. Please check the handle or try again.");
        setLoading(false);
      });
  };

  // Calculate number of problems solved per rating
  const calculateSolvedByRating = (submissions) => {
    const ratingMap = {};

    submissions.forEach((submission) => {
      if (
        submission.verdict === "OK" && // Check if problem is solved
        submission.problem.rating // Check if rating exists
      ) {
        const rating = submission.problem.rating;
        ratingMap[rating] = (ratingMap[rating] || 0) + 1;
      }
    });

    if (Object.keys(ratingMap).length === 0) {
      alert("No problems with valid ratings found for this handle.");
      setShowChart(false);
    } else {
      setRatingData(ratingMap);
      setShowChart(true); // Show charts after fetching data
    }
  };

  // Calculate number of problems solved per tag
  const calculateSolvedByTags = (submissions) => {
    const tagMap = {};

    submissions.forEach((submission) => {
      if (submission.verdict === "OK" && submission.problem.tags) {
        submission.problem.tags.forEach((tag) => {
          tagMap[tag] = (tagMap[tag] || 0) + 1;
        });
      }
    });

    if (Object.keys(tagMap).length === 0) {
      alert("No problems with valid tags found for this handle.");
      setShowChart(false);
    } else {
      setTagData(tagMap);
      setShowChart(true); // Show charts after fetching data
    }
  };

  // Prepare data for Bar Chart (Rating vs. Problems)
  const chartData = {
    labels: Object.keys(ratingData)
      .map(Number)
      .sort((a, b) => a - b),
    datasets: [
      {
        label: "Problems Solved by Rating",
        data: Object.values(
          Object.keys(ratingData)
            .map(Number)
            .sort((a, b) => a - b)
            .map((key) => ratingData[key])
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Pie Chart (Problems solved by tags)
  const pieData = {
    labels: Object.keys(tagData),
    datasets: [
      {
        data: Object.values(tagData),
        backgroundColor: [
          "#FF6F61",
          "#FFB3C6",
          "#C3B1E1",
          "#9AD0F5",
          "#71C9CE",
          "#A7D397",
          "#FFD97D",
          "#EFB495",
          "#E57373",
          "#81C784",
          "#64B5F6",
          "#BA68C8",
          "#FFEB3B",
          "#FF9800",
          "#9E9E9E",
        ],
      },
    ],
  };

  return (
    <>
      <h1>Codeforces Problems by Rating & Tags</h1>

      <h2>Check User Solved Problems</h2>
      <input
        type="text"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        placeholder="Enter Codeforces handle"
      />
      <button onClick={fetchUserSubmissions} disabled={loading}>
        {loading ? "Loading..." : "Fetch User Data"}
      </button>

      {/* Display charts if data is available */}
      {showChart && (
        <div style={{ marginTop: "20px" }}>
          <h3>Problems Solved by Rating</h3>
          <div style={{ width: "600px", height: "400px" }}>
            <Bar data={chartData} options={{ responsive: true }} />
          </div>

          <h3>Problems Solved by Tags</h3>
          <div style={{ width: "500px", height: "500px", marginTop: "20px" }}>
            <Pie data={pieData} options={{ responsive: true }} />
          </div>
        </div>
      )}
    </>
  );
}

export default Page1;
