import React from "react";
import { NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { logout } = useApp();
  const routes = ["Dashboard", "Employees", "Attendance", "Leave", "Payroll"];

  return (
    <aside className="sidebar">
      <div className="brand-header">
        <div className="brand-logo" />
        <span className="brand-name">Dayflow</span>
      </div>

      <nav className="nav-menu">
        {routes.map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase()}`}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {item}
          </NavLink>
        ))}
      </nav>

      <button className="danger-btn" style={{ width: "100%", marginTop: "auto" }} onClick={logout}>
        Sign Out
      </button>
    </aside>
  );
}