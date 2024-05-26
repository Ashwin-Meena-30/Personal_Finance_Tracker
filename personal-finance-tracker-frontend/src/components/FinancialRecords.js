import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import "./FinancialRecords.css";

function FinancialRecords() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // You can make this dynamic if needed
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/financial-records",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
            params: { page, limit, search },
          }
        );
        setRecords(response.data.records || []);
        setTotalPages(response.data.pages || 1);
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    };
    if (auth.token) {
      fetchRecords();
    }
  }, [auth.token, page, limit, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search change
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="financial-records-container">
      <h3>Your Financial Records</h3>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search records"
        />
      </div>
      <table className="financial-records-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record.id}>
                <td>{record.type}</td>
                <td>${record.amount}</td>
                <td>{record.description}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination-container">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default FinancialRecords;
