// src/components/AuthPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    spotify: "",
    codeforces: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login flow
        const res = await axios.post("http://localhost:5001/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
      } else {
        // Register flow
        await axios.post("http://localhost:5001/api/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          spotify: formData.spotify,
          codeforces: formData.codeforces,
        });
        alert("Registration successful! You can now log in.");
      }
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error during authentication");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center mb-6">
          {/* Toggle Buttons */}
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 mr-2 rounded ${
              isLogin ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded ${
              !isLogin ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name field only if Registering */}
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-2 mb-3 rounded bg-gray-700"
              required
            />
          )}
          {/* Email field */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700"
            required
          />
          {/* Password field */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700"
            required
          />
          {/* Additional fields only if Registering */}
          {!isLogin && (
            <>
              <input
                type="text"
                name="spotify"
                placeholder="Spotify Account"
                onChange={handleChange}
                className="w-full p-2 mb-3 rounded bg-gray-700"
              />
              <input
                type="text"
                name="codeforces"
                placeholder="Codeforces Account"
                onChange={handleChange}
                className="w-full p-2 mb-3 rounded bg-gray-700"
              />
            </>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
