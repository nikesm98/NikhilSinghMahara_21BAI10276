import React from 'react';

const Cell = ({ cell, rowIndex, colIndex, handleCellClick }) => {
  return (
    <div
      className={`cell ${cell ? (cell.startsWith('A') ? 'player-a' : 'player-b') : ''}`}
      onClick={() => handleCellClick(rowIndex, colIndex)}
    >
      {cell}
    </div>
  );
};

export default Cell;