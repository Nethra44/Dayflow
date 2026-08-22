function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Dayflow</h1>
        <p className="subtitle">HR Management System</p>

        <form>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;