import React, { useState, useEffect } from "react";
import "./../css/PopupLogin.css"; 
import PopupRegister from "./PopupRegister"; 
import { mainUrl } from "../util/api/requestUtils";
import { useTranslation } from "react-i18next";

const PopupLogin = ({ onClose }) => {
  const { t } = useTranslation(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); 

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Xử lý login
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
        throw new Error(t("Invalid username or password")); 
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      onClose();
      window.location.reload(); 
    } catch (err) {
      setError(err.message); 
    }
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
          <div className="popup-title">{t("Login")}</div>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">{t("Username")}</label>
            <input
              type="text"
              id="username"
              placeholder={t("EnterName")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t("PassWork")}</label>
            <input
              type="password"
              id="password"
              placeholder={t("EnterPass")} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            {t("Login")}
          </button>
        </form>
        <div className="signup-link">
          <button className="signup-button" onClick={handleSignUp}>
            {t("SignUp")} 
          </button>
        </div>

        {isRegistering && <PopupRegister onClose={handleCloseRegister} />}
      </div>
    </div>
  );
};

export default PopupLogin;