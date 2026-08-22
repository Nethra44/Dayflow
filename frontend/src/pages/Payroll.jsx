import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function Payroll() {
  const { employees } = useApp();
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    setPayrolls(
      employees.map((emp, idx) => ({
        id: `PAY-${100 + idx}`,
        name: emp.name,
        baseSalary: 60000 + idx * 5000,
        deduction: 2000,
        status: "Pending",
      }))
    );
  }, [employees]);

  const processPay = (id) => {
    setPayrolls((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Processed" } : item))
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Payroll Management</h1>
          <p>Compute and execute payroll operations.</p>
        </div>
      </div>

      <div className="glass-table-wrapper">
        <table className="glass-table">
          <thead>
            <tr>
              <th>Payroll ID</th>
              <th>Employee</th>
              <th>Base Salary</th>
              <th>Deduction</th>
              <th>Net Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  No active payroll records.
                </td>
              </tr>
            ) : (
              payrolls.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.id}</strong></td>
                  <td>{p.name}</td>
                  <td>₹{p.baseSalary.toLocaleString()}</td>
                  <td>₹{p.deduction.toLocaleString()}</td>
                  <td><strong>₹{(p.baseSalary - p.deduction).toLocaleString()}</strong></td>
                  <td>
                    <span style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: 999,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      background: p.status === "Processed" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                      color: p.status === "Processed" ? "#10b981" : "#f59e0b"
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    {p.status === "Pending" && (
                      <button className="primary-btn" style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }} onClick={() => processPay(p.id)}>
                        Process Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}