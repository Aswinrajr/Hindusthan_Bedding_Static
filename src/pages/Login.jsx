import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Lock } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded credentials for simplicity as requested
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-6 pt-32 pb-12">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
          <div className="w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center text-primary-dark mx-auto mb-6">
            <Lock size={30} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-center text-primary-dark mb-2">
            Admin Login
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Please sign in to manage your products
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-lg transition-colors shadow-lg"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
