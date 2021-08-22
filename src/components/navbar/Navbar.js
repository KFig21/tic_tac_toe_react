import React from "react";
import "./navbar.scss";

export default function Navbar({ resetGame }) {
  return (
    <div className="navbar">
      <span onClick={() => resetGame()}>Tic Tac Toe</span>
    </div>
  );
}
