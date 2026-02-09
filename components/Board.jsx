import React from 'react';
import Tile from './Tile.jsx';
import CenterControls from './CenterControls.jsx';

const Board = ({ tiles, teams, currentPlayer, turnState, diceRoll, onRoll, onBuy, onPass, onNextTurn }) => {
  // Logic to place tiles in a loop around a 7x7 grid
  // Indices 0-23
  const getGridStyle = (index) => {
    // Top (0-6)
    if (index < 7) return { gridColumn: index + 1, gridRow: 1 };
    // Right (7-11)
    if (index < 12) return { gridColumn: 7, gridRow: index - 5 };
    // Bottom (12-18) (Reversed)
    if (index < 19) return { gridColumn: 7 - (index - 12), gridRow: 7 };
    // Left (19-23) (Reversed)
    return { gridColumn: 1, gridRow: 7 - (index - 18) };
  };

  const currentTile = tiles[currentPlayer.pos];

  return (
    <div className="relative w-full max-w-[800px] aspect-square bg-gray-900 rounded-xl border-4 border-gray-800 shadow-2xl overflow-hidden p-2">
      <div className="grid grid-cols-7 grid-rows-7 w-full h-full gap-1">
        
        {/* Center Control Area */}
        <div className="col-start-2 col-end-7 row-start-2 row-end-7 p-2 md:p-8 pointer-events-none z-20">
           {/* Enable pointer events for children */}
           <div className="pointer-events-auto w-full h-full">
             <CenterControls 
               currentPlayer={currentPlayer}
               turnState={turnState}
               currentTile={currentTile}
               diceRoll={diceRoll}
               onRoll={onRoll}
               onBuy={onBuy}
               onPass={onPass}
               onNextTurn={onNextTurn}
             />
           </div>
        </div>

        {/* Tiles */}
        {tiles.map((tile, i) => (
          <Tile 
            key={tile.id} 
            tile={tile} 
            index={i} 
            style={getGridStyle(i)}
            teams={teams}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
