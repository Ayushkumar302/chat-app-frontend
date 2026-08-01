import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axiosInstance from "../utils/axiosInstance";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    
    try {
      const data = await axiosInstance.get(`${logoutRoute}/${id}`);
      if (data.status === 200) {
        localStorage.clear();
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <button 
      onClick={handleClick}
      className="flex justify-center items-center p-3 rounded-xl bg-accent-primary hover:bg-red-500 transition-colors shadow-md group border border-transparent"
    >
      <BiPowerOff className="text-xl text-white group-hover:scale-110 transition-transform" />
    </button>
  );
}
