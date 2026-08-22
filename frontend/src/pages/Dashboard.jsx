import React from "react";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { employees, user } = useApp();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Welcome back, {user?.name || "HR Manager"} 👋</h1>
          <p>Workforce operational overview and live stats.</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="stat-card">
          <span>Total Employees</span>
          <h3>{employees.length}</h3>
        </div>
        <div className="stat-card">
          <span>Active Departments</span>
          <h3>{new Set(employees.map((e) => e.department || "Engineering")).size}</h3>
        </div>
        <div className="stat-card">
          <span>System Sync</span>
          <h3 style={{ color: "#10b981" }}>Active</h3>
        </div>
      </div>

      <div className="glass-table-wrapper" style={{ padding: "1.75rem" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          System Status
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
          All operational screens are active. Navigate through Employees, Attendance, Leave, and Payroll to test live state management.
        </p>
      </div>
    </div>
  );
}