function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p>Welcome to Dayflow.</p>

      <div className="cards">
        <div className="card">
          <h3>Employees</h3>
          <strong>0</strong>
        </div>

        <div className="card">
          <h3>Present Today</h3>
          <strong>0</strong>
        </div>

        <div className="card">
          <h3>Leave Requests</h3>
          <strong>0</strong>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;