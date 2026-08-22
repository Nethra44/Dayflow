import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function Attendance() {
  const { employees } = useApp();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(
      employees.map((emp) => ({
        id: emp.id,
        name: emp.name,
        date: new Date().toISOString().split("T")[0],
        checkIn: "09:00 AM",
        status: "Present",
      }))
    );
  }, [employees]);

  const toggleStatus = (id) => {
    setLogs((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, status: rec.status === "Present" ? "Absent" : "Present" } : rec
      )
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Attendance Tracking</h1>
          <p>Real-time check-in logs driven by active employee data.</p>
        </div>
      </div>

      <div className="glass-table-wrapper">
        <table className="glass-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  No employee records found. Add employees in the Employee Directory screen first.
                </td>
              </tr>
            ) : (
              logs.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.name}</strong></td>
                  <td>{row.date}</td>
                  <td>{row.checkIn}</td>
                  <td>
                    <span style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: 999,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      background: row.status === "Present" ? "rgba(16, 185, 129, 0.15)" : "rgba(244, 63, 94, 0.15)",
                      color: row.status === "Present" ? "#10b981" : "#f43f5e"
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button className="primary-btn" style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }} onClick={() => toggleStatus(row.id)}>
                      Toggle Status
                    </button>
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