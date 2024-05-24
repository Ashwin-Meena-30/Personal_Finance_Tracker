import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Adjust the path as necessary

function AuthenticatedRoute({ children }) {
  const { auth } = useAuth();
  return auth.token ? children : <Navigate replace to="/login" />;
}

export default AuthenticatedRoute;
