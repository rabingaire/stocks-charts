import React from "react";

function Table({ children }) {
  return (
    <table>
      <tbody>{children}</tbody>
    </table>
  );
}

function Row({ render }) {
  return render();
}

export { Table, Row };
