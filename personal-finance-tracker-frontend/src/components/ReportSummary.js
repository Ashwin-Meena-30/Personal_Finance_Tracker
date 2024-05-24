import React from "react";
// import { useAuth } from "./AuthContext"; // Assuming AuthContext is defined in a separate file

function ReportSummary({ records }) {
  const totalIncome = records
    .filter((record) => record.type === "income")
    .reduce((acc, record) => acc + parseFloat(record.amount), 0);
  const totalExpenses = records
    .filter((record) => record.type === "expense")
    .reduce((acc, record) => acc + parseFloat(record.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  return (
    <div>
      <h3>Financial Summary</h3>
      <p>Total Income: ${totalIncome.toFixed(2)}</p>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      <p>Net Balance: ${netBalance.toFixed(2)}</p>
    </div>
  );
}

export default ReportSummary;
