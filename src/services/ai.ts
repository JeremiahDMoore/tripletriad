import { Card, Position, GameState } from '../types/game';

interface CardScore {
  position: Position;
  score: number;
}

export class AI {
  static evaluateMove(card: Card, position: Position, state: GameState): number {
    let score = 0;
    const directions = [
      { row: -1, col: 0, side: 'bottom', opposite: 'top' },
      { row: 1, col: 0, side: 'top', opposite: 'bottom' },
      { row: 0, col: -1, side: 'right', opposite: 'left' },
      { row: 0, col: 1, side: 'left', opposite: 'right' },
    ];

    // Check each adjacent position
    directions.forEach(({ row, col, side, opposite }) => {
      const newRow = position.row + row;
      const newCol = position.col + col;

      if (
        newRow >= 0 && newRow < 3 &&
        newCol >= 0 && newCol < 3 &&
        state.board[newRow][newCol]
      ) {
        const adjacentCard = state.board[newRow][newCol]!;
        if (adjacentCard.owner === 'player') {
          // Potential capture
          if (card[side as keyof Card] > adjacentCard[opposite as keyof Card]) {
            score += 2; // Capturing opponent's card is valuable
          }
        } else if (adjacentCard.owner === 'opponent') {
          // Protect our cards
          score += 0.5;
        }
      }
    });

    // Prefer center and corners
    if (position.row === 1 && position.col === 1) score += 1;
    if ((position.row === 0 || position.row === 2) && 
        (position.col === 0 || position.col === 2)) score += 0.5;

    return score;
  }

  static findBestMove(state: GameState): { card: Card; position: Position } | null {
    const availableMoves: CardScore[] = [];

    // Find all possible moves
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (!state.board[row][col]) {
          state.opponentHand.forEach(card => {
            const score = this.evaluateMove(card, { row, col }, state);
            availableMoves.push({
              position: { row, col },
              score,
            });
          });
        }
      }
    }

    if (availableMoves.length === 0) return null;

    // Find the best move
    const bestMove = availableMoves.reduce((best, current) => 
      current.score > best.score ? current : best
    );

    // Select the card with the highest values for the best position
    const bestCard = state.opponentHand.reduce((best, current) => {
      const currentScore = this.evaluateMove(current, bestMove.position, state);
      const bestScore = this.evaluateMove(best, bestMove.position, state);
      return currentScore > bestScore ? current : best;
    });

    return {
      card: bestCard,
      position: bestMove.position,
    };
  }
}