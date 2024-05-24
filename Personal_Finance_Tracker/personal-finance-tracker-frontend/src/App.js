import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthenticatedRoute from "./components/AuthenticatedRoute"; // Assuming this is extracted to its own file
import AuthenticatedLayout from "./components/AuthenticatedLayout"; // The new layout component
import Dashboard from "./components/Dashboard";
import FinancialRecords from "./components/FinancialRecords";
import RecordForm from "./components/RecordForm";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <h1>Personal Finance Tracker</h1>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              element={
                <AuthenticatedRoute>
                  <AuthenticatedLayout />
                </AuthenticatedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/getlist" element={<FinancialRecords />} />
              <Route path="/savelist" element={<RecordForm />} />
            </Route>
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
