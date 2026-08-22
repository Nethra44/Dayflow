import React from "react";

export default function DataTable({ columns, data, renderRow }) {
  if (!data || data.length === 0) {
    return <div className="no-data">No records available.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  );
}