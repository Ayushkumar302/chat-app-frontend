import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/chat");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background relative flex flex-col justify-between overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-secondary/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-primary/20 blur-[120px]"></div>
      </div>

      <nav className="relative z-10 flex justify-between items-center p-6 lg:px-24">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold uppercase tracking-wider text-white">WhizChat</h1>
        </div>
        <div>
          <Link to="/login">
            <button className="px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all font-semibold text-white">
              Log In
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Connect with friends, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-secondary to-accent-primary">effortlessly.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
          Experience real-time messaging with a sleek, ultra-modern dark interface.
          Join WhizChat today and start chatting without boundaries.
        </p>
        <Link to="/register">
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:brightness-110 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all text-white font-bold text-lg">
            Get Started
          </button>
        </Link>
      </main>

      <footer className="relative z-10 p-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} WhizChat. All rights reserved.</p>
      </footer>
    </div>
  );
}
