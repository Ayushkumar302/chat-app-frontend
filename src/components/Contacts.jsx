import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat, currentUser, currentChat, onlineUsers = [] }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  return (
    <>
      {currentUserName && (
        <div className="flex flex-col w-full h-full bg-zinc-900/50">
          
          {/* Header */}
          <div className="flex items-center justify-center gap-4 py-6 border-b border-white/5">
            <img src={Logo} alt="logo" className="h-8 w-8" />
            <h3 className="text-white text-xl uppercase font-bold tracking-wider">WhizChat</h3>
          </div>
          
          {/* Contacts List */}
          <div className="flex flex-col flex-1 overflow-auto p-4 gap-3 hide-scrollbar">
            {contacts.map((contact, index) => {
              const isSelected = currentChat?._id === contact._id;
              const isOnline = onlineUsers.includes(contact._id);
              return (
                <div
                  key={contact._id}
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                    isSelected ? "bg-accent-primary shadow-[0_4px_15px_rgba(168,85,247,0.4)]" : "bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => changeChat(contact)}
                >
                  <div className="shrink-0 relative">
                    <img
                      src={contact.avatarImage ? `data:image/svg+xml;base64,${contact.avatarImage}` : `https://api.dicebear.com/7.x/bottts/svg?seed=${contact.username}`}
                      alt="avatar"
                      className="h-12 w-12 rounded-full bg-white p-0.5 object-cover"
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-zinc-900 rounded-full shadow-sm animate-pulse"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Current User Footer */}
          <div className="flex items-center justify-center gap-4 p-4 bg-black/40 border-t border-white/5">
            <div className="shrink-0">
              <img
                src={currentUserImage ? `data:image/svg+xml;base64,${currentUserImage}` : `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUserName}`}
                alt="avatar"
                className="h-14 w-14 rounded-full bg-white p-1 object-cover"
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-white font-bold text-lg truncate">{currentUserName} <span className="text-gray-400 text-sm font-normal">(you)</span></h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
