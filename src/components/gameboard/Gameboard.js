import React from "react";
import "./gameboard.scss";
import Position from "./position/Position";

export default function Gameboard({
  board,
  setBoard,
  currentPlayer,
  nextPlayer,
  nextTurn,
  setPos_0,
  setPos_1,
  setPos_2,
  setPos_3,
  setPos_4,
  setPos_5,
  setPos_6,
  setPos_7,
  setPos_8,
  checkWinner,
  setMessage,
  endGame,
  setEmptySpaces,
}) {
  const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const positionSetters = [
    setPos_0,
    setPos_1,
    setPos_2,
    setPos_3,
    setPos_4,
    setPos_5,
    setPos_6,
    setPos_7,
    setPos_8,
  ];

  return (
    <div className="gameboard">
      {indexes.map((i) => {
        return (
          <Position
            index={i}
            key={i}
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            nextPlayer={nextPlayer}
            nextTurn={nextTurn}
            setPos={positionSetters[i]}
            checkWinner={checkWinner}
            setMessage={setMessage}
            endGame={endGame}
          />
        );
      })}
    </div>
  );
}
