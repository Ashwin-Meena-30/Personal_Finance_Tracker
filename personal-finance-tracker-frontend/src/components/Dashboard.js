import React from "react";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <NavLink
          to="/getlist"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Get List
        </NavLink>
        <NavLink
          to="/savelist"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Save List
        </NavLink>
        <NavLink
          to="/report"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Get Report
        </NavLink>
      </div>
    </div>
  );
}

export default Dashboard;
