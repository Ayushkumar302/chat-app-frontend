import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="flex items-center gap-4 px-4 py-4 md:px-8 md:py-6 bg-black/40 border-t border-white/5">
      <div className="relative flex items-center justify-center">
        <BsEmojiSmileFill 
          className="text-2xl text-accent-primary cursor-pointer hover:text-accent-secondary transition-colors" 
          onClick={handleEmojiPickerhideShow} 
        />
        {showEmojiPicker && (
          <div className="absolute bottom-12 left-0 z-50">
            <Picker 
              onEmojiClick={handleEmojiClick} 
              theme="dark"
              pickerStyle={{ backgroundColor: "#18181b", borderColor: "#a855f7", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }} 
            />
          </div>
        )}
      </div>
      
      <form 
        className="flex-1 flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/10 shadow-inner"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          className="flex-1 bg-transparent border-none text-white px-2 py-2 text-base md:text-lg focus:outline-none placeholder-gray-500"
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button 
          className="bg-accent-primary hover:bg-accent-secondary text-white rounded-full p-3 flex justify-center items-center transition-colors shadow-md ml-2"
          type="submit"
        >
          <IoMdSend size={20} />
        </button>
      </form>
    </div>
  );
}
