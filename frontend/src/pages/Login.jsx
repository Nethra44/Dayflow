import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const [email, setEmail] = useState("admin@dayflow.com");
  const [password, setPassword] = useState("password");
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate auth payload (Replace with backend API integration)
    const userData = {
      id: 1,
      email,
      name: email.includes("admin") ? "HR Manager" : "John Doe",
      role: email.includes("admin") ? "hr" : "employee",
    };

    login(userData);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome to Dayflow</h2>
        <p>Sign in to manage your HR workflow</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button type="submit" className="primary-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
}