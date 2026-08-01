import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const fetchUserName = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      if (data) {
        setUserName(data.username);
      }
    };
    fetchUserName();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col text-white w-full h-full p-4 text-center space-y-6">
      <img src={Robot} alt="Robot" className="h-[20rem] max-w-full object-contain mix-blend-screen" />
      <h1 className="text-4xl md:text-5xl font-bold">
        Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">{userName}!</span>
      </h1>
      <h3 className="text-lg md:text-xl text-gray-400">Please select a chat to start messaging.</h3>
    </div>
  );
}
