import React from "react";
import background from "../Images/userbackground.jpg";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  return (
    <>
    <Navbar/>
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
      >
      <div className="text-center bg-white bg-opacity-60 p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Employee Management System</h1>
        <Link to='/login' className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
          Get Started
        </Link>
      </div>
    </div>
      </>
  );
}

export default Home;
