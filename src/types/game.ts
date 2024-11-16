export interface Card {
  id: number;
  name: string;
  image: string;
  top: number;
  right: number;
  bottom: number;
  left: number;
  element?: string;
  owner: 'player' | 'opponent' | null;
}

export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  board: (Card | null)[][];
  playerHand: Card[];
  opponentHand: Card[];
  playerScore: number;
  opponentScore: number;
  currentTurn: 'player' | 'opponent';
  selectedCard: Card | null;
  gameOver: boolean;
}