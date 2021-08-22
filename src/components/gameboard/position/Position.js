import React from "react";
import "./position.scss";

export default function Position({
  index,
  board,
  setBoard,
  currentPlayer,
  nextPlayer,
  nextTurn,
  setPos,
  checkWinner,
  setMessage,
  endGame,
}) {
  const handleClick = () => {
    // check if already played
    if (board[index].mark !== "") {
      return;
    }
    let newBoard = [...board];
    newBoard[index].mark = currentPlayer.marker;
    newBoard[index].playerId = currentPlayer.id;
    setBoard(newBoard);
    setPos(currentPlayer);
    if (checkWinner(index)) {
      endGame();
      return;
    } else {
      setMessage(`${nextPlayer.name}'s turn`);
      nextTurn();
    }
  };

  return (
    <div className="position-container" onClick={handleClick}>
      <span className="marker">{board[index].mark}</span>
    </div>
  );
}
