// src/components/CodeforcesWidget.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CodeforcesWidget = () => {
  // Static data for the bar chart: each entry represents a contest round and number of problems solved.
  const solvedData = [
    { contest: "Round #890", problems: 5 },
    { contest: "Edu Round #155", problems: 3 },
    { contest: "Div2 #450", problems: 7 },
    { contest: "Round #889", problems: 4 },
  ];

  // Static data for upcoming contests
  const upcomingContests = [
    { name: "Codeforces Round #891", date: "2025-04-15" },
    { name: "Edu Round #156", date: "2025-04-20" },
  ];

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105">
      {/* Title in a centered, rounded box */}
      <div className="mb-6">
        <div className="bg-gray-700 rounded-full px-4 py-2 inline-block mx-auto">
          <h2 className="text-2xl font-bold text-white text-center">Codeforces</h2>
        </div>
      </div>

      {/* Bar Chart for Problems Solved */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Problems Solved Recently
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={solvedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="contest" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "#333", border: "none", color: "#fff" }} />
              <Legend />
              <Bar dataKey="problems" fill="#FF8C00" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Contests List */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Upcoming Contests</h3>
        <ul className="space-y-2">
          {upcomingContests.map((contest, index) => (
            <li key={index} className="text-white">
              <span className="font-bold">{contest.name}</span> -{" "}
              <span>{contest.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CodeforcesWidget;
