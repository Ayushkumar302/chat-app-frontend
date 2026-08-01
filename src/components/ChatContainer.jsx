import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../utils/axiosInstance";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import { IoArrowBack } from "react-icons/io5";

export default function ChatContainer({ currentChat, socket, onBack }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const response = await axiosInstance.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    fetchMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axiosInstance.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full bg-zinc-900/30">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-black/40 border-b border-white/5">
        <div className="flex items-center gap-4">
          {/* Back button for mobile */}
          <button 
            onClick={onBack}
            className="md:hidden text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <IoArrowBack size={24} />
          </button>
          <div className="shrink-0">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white p-0.5 shadow-sm"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-bold text-lg md:text-xl truncate">{currentChat.username}</h3>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 flex flex-col gap-4 p-4 md:p-6 overflow-y-auto hide-scrollbar scroll-smooth">
        {messages.map((message) => {
          return (
            <div key={uuidv4()}>
              <div
                className={`flex items-center ${
                  message.fromSelf ? "justify-end" : "justify-start"
                }`}
              >
                <div 
                  className={`max-w-[75%] md:max-w-[60%] px-5 py-3 rounded-2xl text-base ${
                    message.fromSelf 
                      ? "bg-accent-primary text-white rounded-tr-none shadow-[0_4px_15px_rgba(168,85,247,0.2)]" 
                      : "bg-white/10 text-white rounded-tl-none border border-white/5"
                  }`}
                  style={{ wordBreak: 'break-word' }}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Input */}
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
