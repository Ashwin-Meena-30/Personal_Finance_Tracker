import React from "react";
import { useAuth } from "../AuthContext"; // Adjust the path as needed
import "./LogoutButton.css"; // Assuming you will create a CSS file for styling
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null });
    navigate("/login");
  };
  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
