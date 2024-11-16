import React from 'react';
import { Card } from './Card';
import { useGameStore } from '../store/gameStore';

export const GameBoard: React.FC = () => {
  const { board, selectedCard, placeCard } = useGameStore();

  return (
    <div className="grid grid-cols-3 gap-4 bg-gray-800 p-6 rounded-xl">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-32 h-48 border-2 ${
              !cell && selectedCard ? 'border-yellow-400 cursor-pointer' : 'border-gray-600'
            } rounded-lg`}
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