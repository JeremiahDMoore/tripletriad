import React from 'react';
import { Card } from './Card';
import { useGameStore } from '../store/gameStore';

export const GameBoard: React.FC = () => {
  const { board, selectedCard, placeCard } = useGameStore();

  return (
    <div className="game-board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`card ${
              !cell && selectedCard ? 'border-yellow-400 cursor-pointer' : 'border-gray-600'
            }`}
            onClick={() => {
              if (!cell && selectedCard) {
                placeCard({ row: rowIndex, col: colIndex });
              }
            }}
          >
            {cell && <Card card={cell} />}
          </div>
        ))
      )}
    </div>
  );
};
