import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/chat");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axiosInstance.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        if (data.token) {
          localStorage.setItem("chat-app-token", data.token);
        }
        navigate("/chat");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
        {/* Left Side: Graphic */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center p-12 bg-gradient-to-br from-background via-background to-accent-primary/20 relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-accent-secondary/20 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-accent-primary/20 blur-[150px] rounded-full"></div>
          <div className="relative z-10 text-center space-y-6 max-w-lg">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-secondary to-accent-primary">
              Join WhizChat
            </h1>
            <p className="text-xl text-gray-400">
              Connect with anyone, anywhere. Start your journey today.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-background md:bg-transparent">
          {/* Mobile background blur */}
          <div className="absolute inset-0 md:hidden flex justify-center items-center pointer-events-none z-0">
             <div className="w-[80vw] h-[80vw] rounded-full bg-accent-secondary/20 blur-[120px]"></div>
          </div>
          
          <form 
            className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 sm:p-10 shadow-2xl flex flex-col gap-5"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="flex items-center justify-center gap-4 mb-2">
              <img src={logo} alt="logo" className="h-10 w-10" />
              <h1 className="text-2xl font-bold uppercase tracking-wider text-white">WhizChat</h1>
            </div>
            
            <input
              className="w-full bg-transparent border-b-2 border-white/20 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-primary transition-colors text-base"
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            
            <input
              className="w-full bg-transparent border-b-2 border-white/20 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-primary transition-colors text-base"
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            
            <input
              className="w-full bg-transparent border-b-2 border-white/20 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-primary transition-colors text-base"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            
            <input
              className="w-full bg-transparent border-b-2 border-white/20 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-primary transition-colors text-base"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            
            <button 
              className="w-full mt-4 bg-gradient-to-r from-accent-primary to-accent-secondary py-3 rounded-xl text-white font-bold uppercase tracking-wide hover:brightness-110 shadow-[0_4px_15px_rgba(168,85,247,0.4)] transition-all"
              type="submit"
            >
              Create User
            </button>
            
            <span className="text-center text-sm text-gray-400 mt-2">
              Already have an account? <Link to="/login" className="text-accent-primary hover:text-accent-secondary font-bold ml-1">Login.</Link>
            </span>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
