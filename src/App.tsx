import React from 'react';
import { GameBoard } from './components/GameBoard';
import { Hand } from './components/Hand';
import { useGameStore } from './store/gameStore';
import { Swords, RotateCcw } from 'lucide-react';

function App() {
  const {
    playerHand,
    opponentHand,
    playerScore,
    opponentScore,
    currentTurn,
    gameOver,
    resetGame
  } = useGameStore();

  return (
    <div className="min-h-screen bg-gray-600 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/images/pngegg.png" alt="Logo" className="w-[520px] h-auto mr-2" /> {/* Updated width */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Triple Triad
            </h1>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            New Game
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xl">
            Opponent Score: {opponentScore}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
            <Swords className={`w-5 h-5 ${currentTurn === 'player' ? 'text-blue-500' : 'text-red-500'}`} />
            {currentTurn === 'player' ? "Your Turn" : "Opponent's Turn"}
          </div>
          <div className="text-xl">
            Your Score: {playerScore}
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
                {playerScore > opponentScore
                  ? 'You Win!'
                  : playerScore < opponentScore
                  ? 'You Lose!'
                  : "It's a Tie!"}
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
      </div>
    </div>
  );
}

export default App;
