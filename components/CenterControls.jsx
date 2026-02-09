import React from 'react';
import { Dice5 } from 'lucide-react';

const CenterControls = ({ currentPlayer, turnState, currentTile, diceRoll, onRoll, onBuy, onPass, onNextTurn }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center bg-gray-900/95 backdrop-blur rounded-xl border border-gray-700 p-6 shadow-2xl z-20">
      <h2 className="text-xl md:text-2xl font-bold mb-4 drop-shadow-md" style={{ color: currentPlayer.color }}>
        {currentPlayer.name}'s Turn
      </h2>

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {turnState === 'ROLL' && (
          <button
            onClick={onRoll}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95 animate-pulse"
          >
            <Dice5 size={24} /> ROLL DICE
          </button>
        )}

        {turnState === 'BUY' && (
          <div className="animate-in fade-in zoom-in duration-300 w-full max-w-xs">
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-600 mb-4 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-1">{currentTile.name}</h3>
              <div className="text-2xl font-mono text-green-400 mb-4">₹{currentTile.price}</div>
              <div className="flex gap-3">
                <button
                  onClick={onBuy}
                  className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-colors"
                >
                  Buy
                </button>
                <button
                  onClick={onPass}
                  className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-bold transition-colors"
                >
                  Pass
                </button>
              </div>
            </div>
          </div>
        )}

        {turnState === 'END' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col items-center">
            {diceRoll && (
              <div className="text-4xl font-bold text-white mb-6 bg-gray-800 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl border-2 border-gray-600 shadow-inner">
                {diceRoll}
              </div>
            )}
            <button
              onClick={onNextTurn}
              className="px-8 py-3 bg-gray-100 text-gray-900 hover:bg-white rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105"
            >
              Next Player
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CenterControls;
