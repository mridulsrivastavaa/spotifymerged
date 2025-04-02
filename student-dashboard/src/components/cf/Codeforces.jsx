import { useState } from "react";
// import "./index.css";
import CF from "./CF.jsx";
import Problemset from "./problemset.jsx";
import Visualise from "./visualise.jsx";
import ContestList from "./contestList.jsx";
import Weather from "./weather.jsx";
import React from "react";

// Component Mapping
const components = {
  CF: <CF />,
  Problemset: <Problemset />,
  Visualise: <Visualise />,
  ContestList: <ContestList />,
  Weather: <Weather />,
};

function Codeforces() {
  const [selectedComponent, setSelectedComponent] = useState("Visualise");

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105">
      <div className="container">
        <h2>Select a Component to Render</h2>

        {/* Dropdown for Component Selection */}
        <select
          value={selectedComponent}
          onChange={(e) => setSelectedComponent(e.target.value)}
          style={{
            padding: "8px",
            marginBottom: "20px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          {Object.keys(components).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        {/* Render the Selected Component */}
        <div style={{ marginTop: "20px" }}>{components[selectedComponent]}</div>
      </div>
    </div>
  );
}

export default Codeforces;
