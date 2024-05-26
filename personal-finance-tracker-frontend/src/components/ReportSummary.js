import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import "./ReportSummary.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Optionally import this if you need table formatting

function ReportSummary() {
  const [records, setRecords] = useState([]);
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
          }
        );
        setRecords(response.data.records || []);
      } catch (error) {
        console.error("Failed to fetch records:", error);
        setRecords([]);
      }
    };
    fetchRecords();
  }, [auth.token]);

  const totalIncome = records
    .filter((record) => record.type === "Income")
    .reduce((acc, record) => acc + parseFloat(record.amount), 0);
  const totalExpenses = records
    .filter((record) => record.type === "Expense")
    .reduce((acc, record) => acc + parseFloat(record.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  const downloadPdf = () => {
    const doc = new jsPDF();

    // Set font to bold
    doc.setFont("helvetica", "bold"); // Set the font to Helvetica bold
    doc.setFontSize(22); // Set a larger font size similar to an h1 in HTML

    // Adding the title text
    doc.text("Financial Summary", 14, 20); // Adjusted y-coordinate for better spacing

    // Reset font size for other texts
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16); // Reset to a smaller font size for subsequent text

    // Additional text and details
    doc.text(`Total Income: Rs.${totalIncome.toFixed(2)}`, 14, 40);
    doc.text(`Total Expenses: Rs.${totalExpenses.toFixed(2)}`, 14, 50);
    doc.text(`Net Balance: Rs.${netBalance.toFixed(2)}`, 14, 60);

    // Optionally add a table of records
    autoTable(doc, {
      startY: 70,
      head: [["Type", "Amount", "Description", "Date"]],
      body: records.map((record) => [
        record.type,
        `Rs.${record.amount}`,
        record.description,
        new Date(record.date).toLocaleDateString(),
      ]),
    });

    doc.save("financial_summary.pdf");
  };

  return (
    <div className="report-container">
      <h1 className="report-heading">Financial Summary</h1>
      <p className="report-line income">
        Total Income: ${totalIncome.toFixed(2)}
      </p>
      <p className="report-line expenses">
        Total Expenses: ${totalExpenses.toFixed(2)}
      </p>
      <p className="report-line net-balance">
        Net Balance: ${netBalance.toFixed(2)}
      </p>
      <button className="download-button" onClick={downloadPdf}>
        Download Record
      </button>
    </div>
  );
}

export default ReportSummary;
