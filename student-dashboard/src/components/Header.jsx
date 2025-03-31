// Example Header.jsx using GitHub Dark Inspired Theme
import React from "react";
import { FaCog, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-[#0D1117] shadow-lg p-4 transition-transform duration-300">
      
      {/* Left Side: Dashboard label */}
      <div className="flex items-center">
        <h1 className="text-3xl font-bold text-[#58A6FF]">Dashboard</h1>
      </div>

      {/* Center: Curved Welcome Message */}
      <div className="bg-[#161B22] py-3 px-6 rounded-full text-[#C9D1D9] font-serif font-bold text-3xl drop-shadow-md transform transition-all duration-300 hover:scale-110">
        Welcome Student
      </div>

      {/* Right Side: User Icon and Email */}
      <div className="flex items-center space-x-3">
        <FaUser size={28} className="text-[#58A6FF]" />
        <span className="text-[#58A6FF] font-medium">user@example.com</span>
        <FaCog
          size={28}
          className="text-[#58A6FF] cursor-pointer transition-transform duration-300 hover:rotate-45"
        />
      </div>
    </header>
  );
};

export default Header;
