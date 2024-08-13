import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import background from '../Images/loginandregisterbackground.jpg';
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="w-full max-w-md p-8 bg-white bg-opacity-80 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
