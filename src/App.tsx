import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { Hand } from './components/Hand';
import { useGameStore } from './store/gameStore';
import { Swords, RotateCcw } from 'lucide-react';

function App() {
  const {
    playerHand,
    opponentHand,
    currentTurn,
    gameOver,
    resetGame
  } = useGameStore();

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen bg-gray-600 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-10 mx-auto">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
              <Swords className={`w-5 h-5 ${currentTurn === 'player' ? 'text-blue-500' : 'text-red-500'}`} />
              {currentTurn === 'player' ? "Your Turn" : "Opponent's Turn"}
            </div>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              New Game
            </button>
            <button
              onClick={toggleModal}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Rules
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <Hand cards={opponentHand} />
          
          <GameBoard />
          
          <Hand cards={playerHand} isPlayer />
        </div>

        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-xl text-center">
              <h2 className="text-3xl font-bold mb-4">
                Game Over!
              </h2>
              <p className="text-xl mb-6">
                The game has ended.
              </p>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-xl text-center">
              <h2 className="text-3xl font-bold mb-4">How to Play</h2>
              <p className="text-xl mb-6">
                Here are the rules of the game:
                <br />
                1. The objective of the game is to capture more cards than your opponent.
                <br />
                2. Players take turns placing cards on the board.
                <br />
                3. A card can capture an opponent's card if it has a higher number on the adjacent side.
                <br />
                4. The game ends when all cards have been placed, and the player with the most captured cards wins.
              </p>
              <button
                onClick={toggleModal}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
