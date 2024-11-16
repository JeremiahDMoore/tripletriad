import React from 'react';
import { Card } from './Card';
import { useGameStore } from '../store/gameStore';
import { Card as CardType } from '../types/game';

interface HandProps {
  cards: CardType[];
  isPlayer?: boolean;
}

export const Hand: React.FC<HandProps> = ({ cards, isPlayer = false }) => {
  const { selectCard, selectedCard, currentTurn } = useGameStore();

  return (
    <div className={`flex ${isPlayer ? 'justify-end' : 'justify-start'} gap-4`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          selected={selectedCard?.id === card.id}
          disabled={!isPlayer || currentTurn !== 'player'}
          onClick={() => {
            if (isPlayer && currentTurn === 'player') {
              selectCard(card);
            }
          }}
        />
      ))}
    </div>
  );
};