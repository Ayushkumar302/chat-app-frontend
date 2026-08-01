import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { getRequestsRoute, acceptRequestRoute, rejectRequestRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import Logout from "../components/Logout";
import "react-toastify/dist/ReactToastify.css";

export default function Requests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
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
    const fetchRequests = async () => {
      if (currentUser) {
        const { data } = await axiosInstance.get(getRequestsRoute);
        setRequests(data);
      }
    };
    fetchRequests();
  }, [currentUser]);

  const handleRequest = async (id, action) => {
    try {
      const route = action === 'accept' ? acceptRequestRoute : rejectRequestRoute;
      const { data } = await axiosInstance.post(`${route}/${id}`);
      if (data.status) {
        toast.success(data.msg, toastOptions);
        setRequests(requests.filter((req) => req._id !== id));
      } else {
        toast.error(data.msg, toastOptions);
      }
    } catch (error) {
      toast.error(`Failed to ${action} request`, toastOptions);
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
              <Link to="/explore" className="text-gray-400 hover:text-white hover:bg-white/5 px-6 py-2 rounded-full font-semibold transition-all shrink-0">Find Friends</Link>
              <Link to="/requests" className="text-white bg-white/10 px-6 py-2 rounded-full font-semibold transition-all shrink-0">Friend Requests</Link>
            </div>
            <div className="ml-4 shrink-0">
              <Logout />
            </div>
          </div>

          {/* Main Container */}
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-2xl p-6 md:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Pending Requests</h2>
              <p className="text-gray-400">Manage your incoming friend requests.</p>
            </div>
            
            <div className="flex-1 overflow-auto hide-scrollbar">
              {requests.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                   <h3 className="text-xl text-gray-500">No pending requests!</h3>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {requests.map((req) => (
                    <div key={req._id} className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="shrink-0">
                          <img
                            src={`data:image/svg+xml;base64,${req.avatarImage}`}
                            alt="avatar"
                            className="h-16 w-16 rounded-full bg-white p-1"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xl font-bold text-white truncate">{req.username}</h3>
                          <p className="text-gray-400 text-sm truncate">{req.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button 
                          className="flex-1 sm:flex-none bg-green-500/20 hover:bg-green-500/40 text-green-400 border border-green-500/30 font-semibold py-2 px-6 rounded-xl transition-colors"
                          onClick={() => handleRequest(req._id, 'accept')}
                        >
                          Accept
                        </button>
                        <button 
                          className="flex-1 sm:flex-none bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/30 font-semibold py-2 px-6 rounded-xl transition-colors"
                          onClick={() => handleRequest(req._id, 'reject')}
                        >
                          Reject
                        </button>
                      </div>
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
