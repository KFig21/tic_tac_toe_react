import React from "react";
import "./player.scss";

export default function Player({ player, setPlayerName, checkMarker }) {
  const { id, name, marker, score } = player;

  return (
    <div className="player-container">
      <input
        className="player-name"
        type="text"
        maxLength="10"
        name=""
        placeholder={name}
        value={name}
        onChange={(e) => setPlayerName(e.target.value)}
      ></input>
      <span>:</span>
      <input
        className="marker"
        type="text"
        maxLength="1"
        name=""
        placeholder={marker}
        value={marker}
        onChange={(e) => checkMarker(id, e.target.value)}
      ></input>
      <span className="score">{score}</span>
    </div>
  );
}
