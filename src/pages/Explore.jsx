import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { exploreUsersRoute, sendRequestRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import Logout from "../components/Logout";
import "react-toastify/dist/ReactToastify.css";

export default function Explore() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    const fetchExploreUsers = async () => {
      if (currentUser) {
        const { data } = await axiosInstance.get(exploreUsersRoute);
        setUsers(data);
      }
    };
    fetchExploreUsers();
  }, [currentUser]);

  const sendRequest = async (id) => {
    try {
      const { data } = await axiosInstance.post(`${sendRequestRoute}/${id}`);
      if (data.status) {
        toast.success(data.msg, toastOptions);
        setUsers(users.filter((user) => user._id !== id));
      } else {
        toast.error(data.msg, toastOptions);
      }
    } catch (error) {
      toast.error("Failed to send request", toastOptions);
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-background relative overflow-hidden">
        {/* Background radial gradients */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-secondary/10 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-primary/10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 w-full h-full md:w-[90vw] md:h-[90vh] flex flex-col gap-4 p-4 md:p-0 py-4 md:py-0">
          {/* Top Navigation */}
          <div className="flex justify-between items-center bg-zinc-900/70 backdrop-blur-md rounded-full border border-white/10 mx-auto md:mx-0 w-full md:w-auto p-2 pr-4">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              <Link to="/chat" className="text-gray-400 hover:text-white hover:bg-white/5 px-6 py-2 rounded-full font-semibold transition-all shrink-0">Chats</Link>
              <Link to="/explore" className="text-white bg-white/10 px-6 py-2 rounded-full font-semibold transition-all shrink-0">Find Friends</Link>
              <Link to="/requests" className="text-gray-400 hover:text-white hover:bg-white/5 px-6 py-2 rounded-full font-semibold transition-all shrink-0">Friend Requests</Link>
            </div>
            <div className="ml-4 shrink-0">
              <Logout />
            </div>
          </div>

          {/* Main Container */}
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-2xl p-6 md:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Find New Friends</h2>
              <p className="text-gray-400">Discover and connect with people around the world.</p>
            </div>
            
            <div className="flex-1 overflow-auto hide-scrollbar">
              {users.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                   <h3 className="text-xl text-gray-500">No new users to discover!</h3>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {users.map((user) => (
                    <div key={user._id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_4px_20px_rgba(168,85,247,0.15)]">
                      <div className="mb-4">
                        <img
                          src={`data:image/svg+xml;base64,${user.avatarImage}`}
                          alt="avatar"
                          className="h-24 w-24 rounded-full bg-white p-1"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1 truncate w-full">{user.username}</h3>
                      <p className="text-gray-400 text-sm mb-6 truncate w-full">{user.email}</p>
                      <button 
                        className="w-full bg-accent-primary hover:bg-accent-secondary text-white font-semibold py-2.5 rounded-xl transition-all shadow-md"
                        onClick={() => sendRequest(user._id)}
                      >
                        Send Request
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
