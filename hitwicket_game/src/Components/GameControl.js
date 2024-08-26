
import React from 'react';
import './GameControl.css';

const GameControls = ({ turn, selectedCharacter, moveHistory, handleMove, highlightValidMoves }) => {
  return (
    <div className="game-controls">
      <h2>Player {turn}'s Turn</h2>
      {selectedCharacter ? (
        <div className="selected-character">
          <p>Selected: {selectedCharacter.name}</p>
          <div className="valid-moves">
            {highlightValidMoves()}
          </div>
        </div>
      ) : (
        <p>Select a piece to see valid moves.</p>
      )}
      <div className="move-history">
        <h3>Move History</h3>
        <ul>
          {moveHistory.map((move, index) => (
            <li key={index}>{move}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameControls;
