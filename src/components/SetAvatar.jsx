import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import multiavatar from "@multiavatar/multiavatar";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axiosInstance.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/chat");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const svgCode = multiavatar(Math.round(Math.random() * 1000).toString());
      const base64Svg = Buffer.from(svgCode).toString("base64");
      data.push(base64Svg);
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center flex-col gap-12 bg-background h-screen w-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-12 bg-background h-screen w-screen relative overflow-hidden">
           <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-accent-secondary/20 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-accent-primary/20 blur-[150px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 text-center px-4">
            <h1 className="text-white text-3xl md:text-4xl font-bold">Pick an Avatar as your profile picture</h1>
          </div>
          
          <div className="relative z-10 flex flex-wrap justify-center gap-8 px-4">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`border-4 rounded-full p-2 flex justify-center items-center transition-all duration-300 cursor-pointer bg-secondary shadow-sm hover:bg-zinc-800 hover:-translate-y-1 ${
                    selectedAvatar === index ? "border-accent-primary shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "border-transparent"
                  }`}
                  onClick={() => setSelectedAvatar(index)}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    className="h-24 transition-all duration-300 rounded-full bg-white"
                  />
                </div>
              );
            })}
          </div>
          
          <button 
            onClick={setProfilePicture} 
            className="relative z-10 bg-accent-primary text-white py-4 px-8 font-bold uppercase rounded-lg text-base transition-all duration-300 shadow-md hover:bg-accent-secondary hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:-translate-y-0.5"
          >
            Set as Profile Picture
          </button>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
