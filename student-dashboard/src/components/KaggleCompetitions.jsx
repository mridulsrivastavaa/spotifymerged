// src/components/KaggleCompetitions.jsx
import React from "react";
import { FaTrophy } from "react-icons/fa";

const KaggleCompetitions = () => {
  // Static sample data for competitions
  const competitions = [
    {
      id: 1,
      title: "Titanic: Machine Learning from Disaster",
      description:
        "Predict survival on the Titanic and learn the basics of machine learning with this classic competition.",
      date: "Ends: Dec 31, 2025",
    },
    {
      id: 2,
      title: "House Prices: Advanced Regression Techniques",
      description:
        "Predict sales prices and master regression techniques with real-world housing data.",
      date: "Ends: Nov 15, 2025",
    },
    {
      id: 3,
      title: "Santander Customer Transaction Prediction",
      description:
        "Predict customer transactions in a Santander bank dataset and improve your predictive skills.",
      date: "Ends: Jan 20, 2026",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Kaggle Competitions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitions.map((comp) => (
          <div
            key={comp.id}
            className="bg-white border border-blue-200 rounded-lg shadow-md p-4 transform transition duration-300 hover:scale-105"
          >
            <div className="flex justify-center mb-4">
              <FaTrophy className="text-yellow-500" size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              {comp.title}
            </h3>
            <p className="text-gray-800 text-base text-center">
              {comp.description}
            </p>
            <p className="mt-2 text-sm text-gray-800 text-center">
              {comp.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KaggleCompetitions;
