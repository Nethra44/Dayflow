import React from "react";

export default function DataTable({ columns, data, renderRow }) {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) =>
            renderRow ? (
              renderRow(row, index)
            ) : (
              <tr key={index}>
                {Object.values(row).map((val, idx) => (
                  <td key={idx}>{val}</td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}