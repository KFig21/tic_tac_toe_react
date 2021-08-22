import React from "react";
import "./message.scss";

export default function Message({ message }) {
  return (
    <div className="message-container">
      <span className="message">{message}</span>
    </div>
  );
}
