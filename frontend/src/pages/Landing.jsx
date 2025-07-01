// src/Pages/Landing.jsx
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col justify-center items-center px-4">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-center">
        🚀 Welcome to <span className="text-blue-500">SpaceNetra</span>
      </h1>

      <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-xl text-center">
        Explore ISRO missions with AI-powered insights, interactive charts, and natural language answers.
      </p>

      <div className="flex gap-4">
        <Link
          to="/home"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          Get Started
        </Link>
        <Link
          to="/about"
          className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          Learn More
        </Link>
      </div>
      <div className="w-36 h-1 mx-auto bg-blue-500 rounded-full mt-12 animate-pulse" />
    </div>
  );
};

export default Landing;
