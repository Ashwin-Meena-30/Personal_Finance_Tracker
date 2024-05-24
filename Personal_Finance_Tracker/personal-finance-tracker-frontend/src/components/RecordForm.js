import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext"; // Ensure this path is correct
import "./RecordForm.css"; // Ensure this path is correct

function RecordForm({ record, setEditing }) {
  const [type, setType] = useState(record ? record.type : "");
  const [amount, setAmount] = useState(record ? record.amount : "");
  const [description, setDescription] = useState(
    record ? record.description : ""
  );
  const { auth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };
    const body = { type, amount, description };

    try {
      if (record) {
        await axios.put(
          `http://localhost:3000/financial-records/${record.id}`,
          body,
          config
        );
      } else {
        await axios.post(
          "http://localhost:3000/financial-records",
          body,
          config
        );
      }
      setEditing(false);
    } catch (error) {
      console.error("Failed to save the record:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label>Type (income or expense)</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
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
