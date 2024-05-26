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
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      setAuth({
        token: response.data.token,
        user: email,
      });
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 800); // Delay in milliseconds
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : "Login failed. No response from server";
      toast.error(errorMessage);
      console.error("Login failed:", errorMessage);
    }
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
