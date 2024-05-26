import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import "./FinancialRecords.css";
import { toast } from "react-toastify";

function FinancialRecords() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // You can make this dynamic if needed
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [editing, setEditing] = useState(null);
  const [editedRecord, setEditedRecord] = useState({});

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

  const handleEdit = (record) => {
    setEditing(record.id);
    setEditedRecord({ ...record });
  };

  const handleChange = (e, field) => {
    setEditedRecord((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/financial-records/${editedRecord.id}`,
        editedRecord,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setRecords(
        records.map((rec) =>
          rec.id === editedRecord.id ? { ...rec, ...editedRecord } : rec
        )
      );
      setEditing(null);
      toast.success("Record updated successfully!");
    } catch (error) {
      console.error("Failed to update the record:", error);
      toast.error("Failed to update the record.");
    }
  };

  const handleDelete = async (recordId) => {
    try {
      await axios.delete(
        `http://localhost:3000/financial-records/${recordId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setRecords(records.filter((record) => record.id !== recordId));
      toast.success("Record deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the record:", error);
      toast.error("Failed to delete the record.");
    }
  };

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
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                {editing === record.id ? (
                  <select
                    value={editedRecord.type}
                    onChange={(e) => handleChange(e, "type")}
                  >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                ) : (
                  record.type
                )}
              </td>
              <td>
                {editing === record.id ? (
                  <input
                    type="number"
                    value={editedRecord.amount}
                    onChange={(e) => handleChange(e, "amount")}
                  />
                ) : (
                  record.amount
                )}
              </td>
              <td>
                {editing === record.id ? (
                  <input
                    type="text"
                    value={editedRecord.description}
                    onChange={(e) => handleChange(e, "description")}
                  />
                ) : (
                  record.description
                )}
              </td>
              <td>
                {editing === record.id ? (
                  <input
                    type="date"
                    value={editedRecord.date.split("T")[0]}
                    onChange={(e) => handleChange(e, "date")}
                  />
                ) : (
                  new Date(record.date).toLocaleDateString()
                )}
              </td>
              <td>
                {editing === record.id ? (
                  <button
                    className="form-button save-button"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className="update-button"
                      onClick={() => handleEdit(record)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
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
