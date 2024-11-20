import React, { useState, useEffect } from "react";
import "./../css/PopupLogin.css"; // Để thêm style nếu cần
import PopupRegister from "./PopupRegister"; // Import the PopupRegister component
import { mainUrl } from "../util/api/requestUtils";

const PopupLogin = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // New state to toggle the register form

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(mainUrl + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      onClose();
    } catch (err) {
      setError(err.message); // Handle errors during login
    }
    window.location.reload()
  };

  const handleSignUp = () => {
    setIsRegistering(true); 
  };

  const handleCloseRegister = () => {
    setIsRegistering(false); 
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="title-button-login">
          <div className="popup-title">Login</div>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <div className="signup-link">
          <button className="signup-button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
        {isRegistering && <PopupRegister onClose={handleCloseRegister} />}
      </div>
    </div>
  );
};

export default PopupLogin;
