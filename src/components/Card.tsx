import React from 'react';
import { Card as CardType } from '../types/game';
import { ArrowUp, ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onClick, selected, disabled }) => {
  const ownerColor = card.owner === 'player' ? 'bg-blue-500' : 'bg-red-500';
  
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`relative w-32 h-48 rounded-lg ${
        selected ? 'ring-4 ring-yellow-400' : ''
      } ${ownerColor} ${
        disabled ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer transform transition-transform hover:scale-105'
      }`}
    >
      <img
        src={card.image}
        alt={card.name}
        className="w-full h-full object-cover rounded-lg opacity-50"
      />
      <div className="absolute inset-0 p-2 text-white">
        <div className="text-sm font-bold mb-1">{card.name}</div>
        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
          <div className="flex items-center">
            <ArrowUp className="w-4 h-4" />
            <span className="ml-1">{card.top}</span>
          </div>
        </div>
        
        <div className="absolute top-1/2 right-2 -translate-y-1/2">
          <div className="flex items-center">
            <ArrowRight className="w-4 h-4" />
            <span className="ml-1">{card.right}</span>
          </div>
        </div>
        
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
          <div className="flex items-center">
            <ArrowDown className="w-4 h-4" />
            <span className="ml-1">{card.bottom}</span>
          </div>
        </div>
        
        <div className="absolute top-1/2 left-2 -translate-y-1/2">
          <div className="flex items-center">
            <ArrowLeft className="w-4 h-4" />
            <span className="ml-1">{card.left}</span>
          </div>
        </div>
        
        {card.element && (
          <div className="absolute bottom-2 right-2 text-xs font-semibold">
            {card.element}
          </div>
        )}
      </div>
    </div>
  );
};