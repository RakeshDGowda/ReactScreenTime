import React from "react";

import "./Table.css";

const Table = ({ headings, children }: any) => {
  return (
    <table className="common_table">
      <thead>
        <tr>
          {headings.map((item: any, index: any) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default Table;
