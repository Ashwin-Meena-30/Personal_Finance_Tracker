import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [setShowError] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setShowError(true); // Set error state to true
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
      });
      toast.success("Registration successful! Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : "Registration failed. No response from server";
      toast.error(errorMessage);
      console.error("Registration failed:", errorMessage);
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <form onSubmit={handleRegister} className="form">
        <h2>Signup</h2>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Signup</button>
        <p className="form-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
