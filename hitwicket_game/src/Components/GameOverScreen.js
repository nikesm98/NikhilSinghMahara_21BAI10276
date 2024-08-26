
import React from 'react';
import './GameOverScreen.css';

const GameOverScreen = ({ winner, startNewGame }) => {
  return (
    <div className="game-over">
      <h2>Game Over!</h2>
      <p>Winner: Player {winner}</p>
      <button onClick={startNewGame}>Start New Game</button>
    </div>
  );
};

export default GameOverScreen;
