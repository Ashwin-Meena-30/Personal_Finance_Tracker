import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("user");
    if (token && userEmail) {
      setAuth({ token, user: userEmail });
      navigate("/dashboard");
    }
  }, [setAuth, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setShowError(true); // Set error state to true
      toast.error("Please enter both email and password.");
      return;
    }

    setShowError(false); // Reset error state on successful validation
    // Proceed with existing login logic...
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={showError && !email.trim() ? "input-error" : ""}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={showError && !password.trim() ? "input-error" : ""}
          />
        </div>
        <button type="submit">Login</button>
        <p className="form-link">
          Don’t have an account? <Link to="/register">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
