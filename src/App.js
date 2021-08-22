import { useEffect, useState } from "react";
import "./app.scss";
import Gameboard from "./components/gameboard/Gameboard";
import Message from "./components/message/Message";
import Navbar from "./components/navbar/Navbar";
import Player from "./components/player/Player";

function App() {
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [player1Marker, setPlayer1Marker] = useState("X");
  const [player2Marker, setPlayer2Marker] = useState("O");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const player1 = {
    id: 1,
    name: player1Name,
    marker: player1Marker,
    score: player1Score,
  };
  const player2 = {
    id: 2,
    name: player2Name,
    marker: player2Marker,
    score: player2Score,
  };

  const [turn, setTurn] = useState(1);
  const [round, setRound] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [nextPlayer, setNextPlayer] = useState(player2);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [vsCPU, setVsCPU] = useState(false);
  const [cpuTurnMod, setCpuTurnMod] = useState(0);
  const [pos_0, setPos_0] = useState("");
  const [pos_1, setPos_1] = useState("");
  const [pos_2, setPos_2] = useState("");
  const [pos_3, setPos_3] = useState("");
  const [pos_4, setPos_4] = useState("");
  const [pos_5, setPos_5] = useState("");
  const [pos_6, setPos_6] = useState("");
  const [pos_7, setPos_7] = useState("");
  const [pos_8, setPos_8] = useState("");
  const [message, setMessage] = useState("Player 1's turn");
  const [scoreboard, setScoreboard] = useState("");
  const [board, setBoard] = useState([
    { pos: 0, mark: pos_0, playerId: "" },
    { pos: 1, mark: pos_1, playerId: "" },
    { pos: 2, mark: pos_2, playerId: "" },
    { pos: 3, mark: pos_3, playerId: "" },
    { pos: 4, mark: pos_4, playerId: "" },
    { pos: 5, mark: pos_5, playerId: "" },
    { pos: 6, mark: pos_6, playerId: "" },
    { pos: 7, mark: pos_7, playerId: "" },
    { pos: 8, mark: pos_8, playerId: "" },
  ]);

  useEffect(() => {
    if (player1Score === player2Score) {
      setScoreboard(`Tied ${player1Score} - ${player2Score}`);
    } else if (player1Score > player2Score) {
      setScoreboard(`${player1Name} leads ${player1Score} - ${player2Score}`);
    } else {
      setScoreboard(`${player2Name} leads ${player2Score} - ${player1Score}`);
    }
  }, [player1Score, player2Score, player1Name, player2Name]);

  const updateBoardAfterCPUmove = (i) => {
    let newBoard = [...board];
    newBoard[i].mark = player2.marker;
    newBoard[i].playerId = player2.id;
    setBoard(newBoard);
    if (checkWinner(i)) {
      endGame();
      return;
    } else {
      setMessage(`${nextPlayer.name}'s turn`);
      nextTurn();
    }
  };

  const nextTurn = () => {
    turn < 9 ? setTurn(turn + 1) : endGame(true);
    if (currentPlayer.id === 1) {
      setCurrentPlayer(player2);
      setNextPlayer(player1);
    } else {
      setCurrentPlayer(player1);
      setNextPlayer(player2);
    }
  };

  const endGame = (tie) => {
    if (tie) {
      setMessage(`It's a tie!`);
      setIsRoundOver(true);
      setRound(round + 1);
      return;
    }
    setMessage(`${currentPlayer.name} wins!`);
    currentPlayer.id === 1
      ? setPlayer1Score(player1Score + 1)
      : setPlayer2Score(player2Score + 1);
    setIsRoundOver(true);
    setRound(round + 1);
  };

  useEffect(() => {
    if (round % 2 === 0) {
      setCpuTurnMod(1);
    } else {
      setCpuTurnMod(0);
    }
  }, [round]);

  const resetBoard = () => {
    setTurn(1);
    setBoard([
      { pos: 0, mark: "", playerId: "" },
      { pos: 1, mark: "", playerId: "" },
      { pos: 2, mark: "", playerId: "" },
      { pos: 3, mark: "", playerId: "" },
      { pos: 4, mark: "", playerId: "" },
      { pos: 5, mark: "", playerId: "" },
      { pos: 6, mark: "", playerId: "" },
      { pos: 7, mark: "", playerId: "" },
      { pos: 8, mark: "", playerId: "" },
    ]);
    setPos_0("");
    setPos_1("");
    setPos_2("");
    setPos_3("");
    setPos_4("");
    setPos_5("");
    setPos_6("");
    setPos_7("");
    setPos_8("");
    if (round % 2 === 1) {
      setCurrentPlayer(player1);
      setNextPlayer(player2);
    } else {
      setCurrentPlayer(player2);
      setNextPlayer(player1);
    }
  };

  const checkWinner = (fieldIndex) => {
    const winConditions = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ];

    return winConditions
      .filter((winCombo) => winCombo.includes(parseInt(fieldIndex)))
      .some((posibleWinCombos) =>
        posibleWinCombos.every(
          (index) => board[index].playerId === currentPlayer.id
        )
      );
  };

  const startGame = () => {
    setIsPlaying(true);
    setIsRoundOver(false);
    setVsCPU(false);
    setCurrentPlayer(player1);
    resetBoard();
    setPlayer2Name("Player 2");
    setNextPlayer(player2);
    setRound(1);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setPlayer1Score(0);
    setPlayer2Score(0);
    resetBoard();
    setCurrentPlayer(player1);
    setMessage(`${player1.name}'s turn`);
  };

  const nextRound = () => {
    resetBoard();
    setIsRoundOver(false);
    setMessage(`${nextPlayer.name}'s turn`);
  };

  // vs CPU functionality
  const startGameCPU = () => {
    setIsPlaying(true);
    setIsRoundOver(false);
    setVsCPU(true);
    setCurrentPlayer(player1);
    setNextPlayer(player2);
    setPlayer2Name("Computer");
    setRound(1);
  };

  useEffect(() => {
    if (vsCPU) {
      if (turn % 2 === cpuTurnMod) {
        setTimeout(() => {
          let cpuMove = getCpuMove();
          switch (cpuMove) {
            case 0:
              setPos_0(player2);
              updateBoardAfterCPUmove(0);
              break;
            case 1:
              setPos_1(player2);
              updateBoardAfterCPUmove(1);
              break;
            case 2:
              setPos_2(player2);
              updateBoardAfterCPUmove(2);
              break;
            case 3:
              setPos_3(player2);
              updateBoardAfterCPUmove(3);
              break;
            case 4:
              setPos_4(player2);
              updateBoardAfterCPUmove(4);
              break;
            case 5:
              setPos_5(player2);
              updateBoardAfterCPUmove(5);
              break;
            case 6:
              setPos_6(player2);
              updateBoardAfterCPUmove(6);
              break;
            case 7:
              setPos_7(player2);
              updateBoardAfterCPUmove(7);
              break;
            case 8:
              setPos_8(player2);
              updateBoardAfterCPUmove(8);
              break;
            default:
              return;
          }
        }, 800);
      }
      return;
    }
  }, [turn]);

  const getCpuMove = () => {
    let possibleMoves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i].mark === "") {
        possibleMoves.push(i);
      }
    }
    let randomIndex = Math.floor(Math.random() * possibleMoves.length);
    return possibleMoves[randomIndex];
  };

  useEffect(() => {
    if (vsCPU) {
      setPlayer2Name("Computer");
      setCurrentPlayer(player1);
      setNextPlayer(player2);
      setMessage(`${player1.name}'s turn`);
    } else {
      setPlayer2Name("Player 2");
      setNextPlayer(player2);
      setCurrentPlayer(player1);
    }
  }, [isPlaying]);

  // change marker
  const checkMarker = (id, newMark) => {
    // check if the new marker for player 1 is already in use by player 2
    if (id === 1) {
      if (newMark.toLowerCase() === player2Marker.toLowerCase()) {
        return;
      } else {
        setPlayer1Marker(newMark);
      }
    }

    // check if the new marker for player 2 is already in use by player 1
    if (id === 2) {
      if (newMark.toLowerCase() === player1Marker.toLowerCase()) {
        return;
      } else {
        setPlayer2Marker(newMark);
      }
    }
  };

  return (
    <div className="App">
      <Navbar resetGame={resetGame} />
      {!isPlaying && (
        <div className="menu">
          <div className="modal">
            <span className="title">Let's Play</span>
            <button className="human" onClick={() => startGame()}>
              vs Human
            </button>
            <button className="computer" onClick={() => startGameCPU()}>
              vs Computer
            </button>
          </div>
        </div>
      )}
      {isRoundOver && isPlaying && (
        <div className="shade">
          <div className="modal">
            <span className="title">Continue?</span>
            <p>{scoreboard}</p>
            <button onClick={() => nextRound()}>Next Round</button>
            <button className="quit" onClick={() => resetGame()}>
              Quit
            </button>
          </div>
        </div>
      )}
      {isPlaying && (
        <div className="content">
          <div className="players-container">
            <Player
              player={player1}
              setPlayerName={setPlayer1Name}
              checkMarker={checkMarker}
            />
            <Player
              player={player2}
              setPlayerName={setPlayer2Name}
              checkMarker={checkMarker}
            />
          </div>
          <Message message={message} />
          {/* keeps player from playing extra moves vs cpu */}
          {vsCPU && turn % 2 === cpuTurnMod && <div className="cpu-turn"></div>}
          <Gameboard
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            nextPlayer={nextPlayer}
            nextTurn={nextTurn}
            setPos_0={setPos_0}
            setPos_1={setPos_1}
            setPos_2={setPos_2}
            setPos_3={setPos_3}
            setPos_4={setPos_4}
            setPos_5={setPos_5}
            setPos_6={setPos_6}
            setPos_7={setPos_7}
            setPos_8={setPos_8}
            checkWinner={checkWinner}
            setMessage={setMessage}
            endGame={endGame}
          />
          <span className="round">Round {round}</span>
        </div>
      )}
    </div>
  );
}

export default App;
