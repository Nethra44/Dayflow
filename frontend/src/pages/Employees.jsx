import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Employees() {
  const { employees, addEmployee, deleteEmployee } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", department: "Engineering" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;
    addEmployee({ id: Date.now(), ...formData });
    setFormData({ name: "", role: "", department: "Engineering" });
    setShowModal(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Employees Directory</h1>
          <p>Manage active company staff and dynamic roles.</p>
        </div>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          + Add Employee
        </button>
      </div>

      <div className="glass-table-wrapper">
        <table className="glass-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>
                  No employees found. Click "+ Add Employee" to add one.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td><strong>#{emp.id}</strong></td>
                  <td>{emp.name}</td>
                  <td>{emp.role}</td>
                  <td>{emp.department || "Engineering"}</td>
                  <td>
                    <button className="danger-btn" onClick={() => deleteEmployee(emp.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="login-container" style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(9, 13, 22, 0.85)" }}>
          <div className="login-card" style={{ maxWidth: 460 }}>
            <h2>Add New Employee</h2>
            <p>Register a new employee profile in Dayflow.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                <button type="button" className="danger-btn" style={{ flex: 1 }} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn" style={{ flex: 1, marginTop: 0 }}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}