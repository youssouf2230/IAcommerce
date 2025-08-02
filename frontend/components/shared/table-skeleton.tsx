import React from "react";

const rows = 8; 
const cols = 6; 

export default function TableSkeleton() {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {[...Array(cols)].map((_, i) => (
            <th key={i} className="p-4 border border-gray-300">
              <div className="h-6 bg-gray-300 rounded shadow-md animate-pulse"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows)].map((_, rowIdx) => (
          <tr key={rowIdx}>
            {[...Array(cols)].map((_, colIdx) => (
              <td key={colIdx} className="p-4 border border-gray-300">
                <div className="h-4 bg-gray-300 rounded shadow-md animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
