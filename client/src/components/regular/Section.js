import React from "react";

export default function Section({ children, id, className }) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}
