import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("dayflow_user")) || null);
  const [employees, setEmployees] = useState([
    { id: 101, name: "Sarah Jenkins", role: "Frontend Lead", department: "Engineering" },
    { id: 102, name: "Michael Chen", role: "Backend Developer", department: "Engineering" },
    { id: 103, name: "Emily Rodriguez", role: "HR Specialist", department: "Human Resources" },
  ]);

  const login = (userData) => {
    localStorage.setItem("dayflow_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("dayflow_user");
    setUser(null);
  };

  const addEmployee = (emp) => {
    setEmployees((prev) => [...prev, emp]);
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <AppContext.Provider value={{ user, employees, login, logout, addEmployee, deleteEmployee }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);