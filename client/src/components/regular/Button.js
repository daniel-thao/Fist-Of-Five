import React from "react";

export default function Button({ className, id, onClick, type, children, value }) {
  return (
    <>
      <button id={id} className={className} onClick={onClick} value={value}>
        {children}
      </button>
    </>
  );
}
