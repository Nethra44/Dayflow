import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function Leave() {
  const { employees } = useApp();
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    setLeaveRequests(
      employees.map((emp, idx) => ({
        id: `LV-${200 + idx}`,
        name: emp.name,
        type: idx % 2 === 0 ? "Casual Leave" : "Sick Leave",
        duration: "2 Days",
        status: "Pending",
      }))
    );
  }, [employees]);

  const updateLeaveStatus = (id, newStatus) => {
    setLeaveRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Leave Management</h1>
          <p>Review and process pending leave applications.</p>
        </div>
      </div>

      <div className="glass-table-wrapper">
        <table className="glass-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  No leave requests available. Add employees to generate requests.
                </td>
              </tr>
            ) : (
              leaveRequests.map((req) => (
                <tr key={req.id}>
                  <td><strong>{req.id}</strong></td>
                  <td>{req.name}</td>
                  <td>{req.type}</td>
                  <td>{req.duration}</td>
                  <td>
                    <span style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: 999,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      background: req.status === "Approved" ? "rgba(16, 185, 129, 0.15)" : req.status === "Rejected" ? "rgba(244, 63, 94, 0.15)" : "rgba(245, 158, 11, 0.15)",
                      color: req.status === "Approved" ? "#10b981" : req.status === "Rejected" ? "#f43f5e" : "#f59e0b"
                    }}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === "Pending" ? (
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button className="primary-btn" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }} onClick={() => updateLeaveStatus(req.id, "Approved")}>
                          Approve
                        </button>
                        <button className="danger-btn" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }} onClick={() => updateLeaveStatus(req.id, "Rejected")}>
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Completed</span>
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