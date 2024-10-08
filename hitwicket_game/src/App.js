import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./Components/Board";
import GameControls from "./Components/GameControl";
import GameOverScreen from "./Components/GameOverScreen";

const initialBoard = [
  ['A-P1', 'A-H1', 'A-H2', 'A-H3', 'A-P2'],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  ['B-P1', 'B-H1', 'B-H2', 'B-H3', 'B-P2']
];

const CharacterTypes = {
  P: { moves: ["L", "R", "F", "B"] },
  H1: { moves: ["L", "R", "F", "B"] },
  H2: { moves: ["FL", "FR", "BL", "BR"] },
  H3: { moves: ["L2P", "R2P", "F2P", "B2P"] }, 
};

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("A");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onopen = () => {
      console.log("Connected to the server");
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const gameState = JSON.parse(event.data);
      setBoard(gameState.board);
      setMoveHistory(gameState.moveHistory);
      setTurn(gameState.turn);
      if (gameState.gameOver) {
        setWinner(gameState.winner);
        setGameOver(true);
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from the server");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleMove = (character, move) => {
    if (ws) {
      ws.send(JSON.stringify({ player: turn, character, move }));
    }
  };

  const handleCellClick = (row, col) => {
    const cell = board[row][col];

    // If a piece belonging to the current player is clicked
    if (cell && cell.startsWith(turn)) {
      setSelectedCharacter({ row, col, name: cell });
    } 
    // If a cell is clicked to move the selected piece
    else if (selectedCharacter) {
      const validMove = checkMoveValidity(selectedCharacter, row, col);

      if (validMove) {
        const updatedBoard = [...board];

        // Move the piece and clear its previous spot
        updatedBoard[selectedCharacter.row][selectedCharacter.col] = null;
        updatedBoard[row][col] = selectedCharacter.name;

        // Update the state
        setBoard(updatedBoard);
        setMoveHistory([...moveHistory, { from: selectedCharacter, to: { row, col } }]);

        // Switch turns
        setTurn(turn === "A" ? "B" : "A");
        setSelectedCharacter(null);
      }
    }
  };

  // Function to check if the move is valid based on character type
  const checkMoveValidity = (selectedCharacter, targetRow, targetCol) => {
    // const characterType = selectedCharacter.name.split('-')[1]?.[0]; 
    return true;
  };

  const highlightValidMoves = () => {
    if (selectedCharacter) {
      const { name } = selectedCharacter;
      const characterType = name.split('-')[1]?.[0]; 
      if (characterType && CharacterTypes[characterType]) {
        const moves = CharacterTypes[characterType].moves;
        return (
          <div className="valid-moves">
            {moves.map((move) => (
              <button key={move} onClick={() => handleMove(name, move)}>
                {move}
              </button>
            ))}
          </div>
        );
      } else {
        console.error("Invalid character type:", characterType);
        return null;
      }
    }
    return null;
  };

  const startNewGame = () => {
    setBoard(initialBoard);
    setTurn("A");
    setMoveHistory([]);
    setSelectedCharacter(null);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="game">
      <h1>5x5 Strategy Game</h1>
      {gameOver ? (
        <GameOverScreen winner={winner} startNewGame={startNewGame} />
      ) : (
        <>
          <div className="game-info">Current Player: {turn}</div>
          <Board
            board={board}
            handleCellClick={handleCellClick}
            selectedCharacter={selectedCharacter}
          />
          <GameControls
            turn={turn}
            selectedCharacter={selectedCharacter}
            moveHistory={moveHistory}
            handleMove={handleMove}
            highlightValidMoves={highlightValidMoves}
          />
        </>
      )}
    </div>
  );
}

export default App;
