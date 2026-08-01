import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { io } from "socket.io-client";
import { getFriendsRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Logout from "../components/Logout";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/");
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
    if (currentUser) {
      socket.current = io(host, { withCredentials: true });
      socket.current.emit("add-user", currentUser._id);
      
      socket.current.on("online-users", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axiosInstance.get(`${getFriendsRoute}`);
          setContacts(data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchFriends();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-background relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-secondary/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-primary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full h-full md:w-[90vw] md:h-[90vh] flex flex-col gap-4 p-4 md:p-0 py-4 md:py-0">
        {/* Top Navigation - Hide on mobile if a chat is open */}
        <div className={`flex justify-between items-center bg-zinc-900/70 backdrop-blur-md rounded-full border border-white/10 mx-auto md:mx-0 w-full md:w-auto p-2 pr-4 ${currentChat ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <Link to="/chat" className="text-white bg-white/10 px-6 py-2 rounded-full font-semibold transition-all shrink-0">Chats</Link>
            <Link to="/explore" className="text-gray-400 hover:text-white hover:bg-white/5 px-6 py-2 rounded-full font-semibold transition-all shrink-0">Find Friends</Link>
            <Link to="/requests" className="text-gray-400 hover:text-white hover:bg-white/5 px-6 py-2 rounded-full font-semibold transition-all shrink-0">Friend Requests</Link>
          </div>
          <div className="ml-4 shrink-0">
            <Logout />
          </div>
        </div>

        {/* Main Chat Container */}
        <div className="flex-1 bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
          
          {/* Contacts Sidebar: Hide on mobile if a chat is selected */}
          <div className={`md:w-1/3 lg:w-1/4 h-full border-r border-white/5 ${currentChat ? 'hidden md:flex' : 'flex'}`}>
            <Contacts contacts={contacts} changeChat={handleChatChange} currentUser={currentUser} currentChat={currentChat} onlineUsers={onlineUsers} />
          </div>

          {/* Chat Area: Hide on mobile if NO chat is selected */}
          <div className={`flex-1 h-full ${!currentChat ? 'hidden md:flex' : 'flex'}`}>
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer currentChat={currentChat} socket={socket} onBack={() => setCurrentChat(undefined)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
