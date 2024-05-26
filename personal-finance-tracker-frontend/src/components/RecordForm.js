import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext"; // Ensure this path is correct
import "./RecordForm.css"; // Ensure this path is correct
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function RecordForm({ record, setEditing }) {
  const [type, setType] = useState(record ? record.type : "");
  const [amount, setAmount] = useState(record ? record.amount : "");
  const [description, setDescription] = useState(
    record ? record.description : ""
  );
  const [date, setDate] = useState(record ? record.date : "");
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };
    const body = { type, amount, description, date };

    try {
      await axios.post("http://localhost:3000/financial-records", body, config);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to save the record:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label>Type</label>
          <select
            className="dropdown"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="form-button">
          Save Record
        </button>
      </form>
    </div>
  );
}

export default RecordForm;
