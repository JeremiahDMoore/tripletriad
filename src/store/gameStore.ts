import { create } from 'zustand';
import { GameState, Card, Position } from '../types/game';
import { initialCards } from '../data/cards';
import { AI } from '../services/ai';

const createInitialState = (): GameState => ({
  board: Array(3).fill(null).map(() => Array(3).fill(null)),
  playerHand: initialCards.slice(0, 5).map(card => ({ ...card, owner: 'player' })),
  opponentHand: initialCards.slice(5, 10).map(card => ({ ...card, owner: 'opponent' })),
  playerScore: 5,
  opponentScore: 5,
  currentTurn: 'player',
  selectedCard: null,
  gameOver: false,
});

export const useGameStore = create<GameState & {
  selectCard: (card: Card) => void;
  placeCard: (position: Position) => void;
  checkAdjacentCards: (position: Position, card: Card) => void;
  makeOpponentMove: () => void;
  resetGame: () => void;
}>((set, get) => ({
  ...createInitialState(),

  selectCard: (card) => {
    const state = get();
    if (state.currentTurn === 'player') {
      set({ selectedCard: card });
    }
  },

  placeCard: (position) => {
    const state = get();
    if (!state.selectedCard || state.board[position.row][position.col]) return;

    const newBoard = [...state.board.map(row => [...row])];
    newBoard[position.row][position.col] = state.selectedCard;

    const newPlayerHand = state.playerHand.filter(
      card => card.id !== state.selectedCard!.id
    );

    set({
      board: newBoard,
      playerHand: newPlayerHand,
      selectedCard: null,
      currentTurn: 'opponent',
    });

    get().checkAdjacentCards(position, state.selectedCard);

    // Check if game is over
    if (newPlayerHand.length === 0) {
      set({ gameOver: true });
      return;
    }

    // Trigger opponent's turn after a short delay
    setTimeout(() => {
      get().makeOpponentMove();
    }, 1000);
  },

  makeOpponentMove: () => {
    const state = get();
    if (state.currentTurn !== 'opponent' || state.gameOver) return;

    const move = AI.findBestMove(state);
    if (!move) {
      set({ gameOver: true });
      return;
    }

    const newBoard = [...state.board.map(row => [...row])];
    newBoard[move.position.row][move.position.col] = move.card;

    const newOpponentHand = state.opponentHand.filter(
      card => card.id !== move.card.id
    );

    set({
      board: newBoard,
      opponentHand: newOpponentHand,
      currentTurn: 'player',
    });

    get().checkAdjacentCards(move.position, move.card);

    // Check if game is over
    if (newOpponentHand.length === 0) {
      set({ gameOver: true });
    }
  },

  checkAdjacentCards: (position, placedCard) => {
    const state = get();
    const newBoard = [...state.board.map(row => [...row])];
    let playerScore = state.playerScore;
    let opponentScore = state.opponentScore;

    // Define the directions and their corresponding card values to compare
    const directions = [
      { row: -1, col: 0, attackValue: placedCard.top, defendValue: 'bottom' },    // Check card above
      { row: 1, col: 0, attackValue: placedCard.bottom, defendValue: 'top' },     // Check card below
      { row: 0, col: -1, attackValue: placedCard.left, defendValue: 'right' },    // Check card to the left
      { row: 0, col: 1, attackValue: placedCard.right, defendValue: 'left' },     // Check card to the right
    ];

    directions.forEach(({ row, col, attackValue, defendValue }) => {
      const newRow = position.row + row;
      const newCol = position.col + col;

      // Check if the adjacent position is within bounds and has a card
      if (
        newRow >= 0 && newRow < 3 &&
        newCol >= 0 && newCol < 3 &&
        newBoard[newRow][newCol]
      ) {
        const adjacentCard = newBoard[newRow][newCol];
        
        // Only compare cards if they belong to different owners
        if (adjacentCard && adjacentCard.owner !== placedCard.owner) {
          const defendingValue = adjacentCard[defendValue as keyof Card] as number;

          // Compare the values - if attacking value is higher, capture the card
          if (attackValue > defendingValue) {
            newBoard[newRow][newCol] = {
              ...adjacentCard,
              owner: placedCard.owner
            };

            // Update scores
            if (placedCard.owner === 'player') {
              playerScore++;
              opponentScore--;
            } else {
              playerScore--;
              opponentScore++;
            }
          }
        }
      }
    });

    set({
      board: newBoard,
      playerScore,
      opponentScore
    });
  },

  resetGame: () => {
    set(createInitialState());
  },
}));