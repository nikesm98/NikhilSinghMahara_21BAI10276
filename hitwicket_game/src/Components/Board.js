// src/Components/Board.js
import React from "react";
import "../Components/Board.css";

const Board = ({ board, handleCellClick, selectedCharacter }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelected =
            selectedCharacter &&
            selectedCharacter.row === rowIndex &&
            selectedCharacter.col === colIndex;
          const cellClass = cell ? "occupied" : "empty";
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`board-cell ${cellClass} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {/* Rendering the piece */}
              {cell && <div className={`piece ${cell}`}>{cell}</div>}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Board;
