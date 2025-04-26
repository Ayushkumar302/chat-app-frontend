import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import "../styles/WelcomeStyles.css";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const data = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        if (data && data.username) {
          setUserName(data.username);
        }
      } catch (error) {
        console.error("Error fetching username from localStorage:", error);
      }
    };
  
    fetchUserName();
  }, []);
  
  return (
    <div className="Containerwel">
      <img id="imgg" src={Robot} alt="" />
      <h1 className="h">
        Welcome, <span className="usernamee">{userName}!</span>
      </h1>
      <h3 className="h">Please select a chat to Start messaging.</h3>
    </div>
  );
}

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   flex-direction: column;
//   img {
//     height: 20rem;
//   }
//   span {
//     color: #4e0eff;
//   }
// `;
