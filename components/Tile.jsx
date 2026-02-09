import React from 'react';

const Tile = ({ tile, index, style, teams }) => {
  const owner = tile.owner !== null ? teams.find(t => t.id === tile.owner) : null;
  const playersHere = teams.filter(p => p.pos === index);

  // Dynamic styling for different tile types
  const getTileBg = () => {
    if (tile.type === 'corner') return 'bg-gray-700';
    if (tile.type === 'start') return 'bg-blue-900/40';
    if (tile.type === 'chance') return 'bg-purple-900/40';
    return 'bg-gray-800';
  };

  return (
    <div
      className={`relative flex flex-col border border-gray-700 text-xs overflow-hidden transition-all duration-300 hover:z-10 hover:scale-105 hover:shadow-xl ${getTileBg()}`}
      style={style}
    >
      {/* Property Color Strip */}
      {tile.type === 'prop' && (
        <div
          className="h-2 w-full"
          style={{ backgroundColor: tile.color }}
        />
      )}

      <div className="flex-1 p-1 flex flex-col items-center justify-center text-center">
        <span className="font-semibold text-gray-200 leading-tight">{tile.name}</span>
        {tile.price > 0 && (
          <span className="text-gray-400 mt-1">₹{tile.price}</span>
        )}
      </div>

      {/* Owner Marker */}
      {owner && (
        <div
          className="absolute top-0 right-0 w-3 h-3 rounded-bl-md shadow-sm"
          style={{ backgroundColor: owner.color }}
          title={`Owned by ${owner.name}`}
        />
      )}

      {/* Players Tokens */}
      <div className="absolute bottom-1 left-1 right-1 flex flex-wrap justify-center gap-1 pointer-events-none">
        {playersHere.map((p, idx) => (
          <div
            key={p.id}
            className="w-3 h-3 rounded-full border border-white shadow-lg transform transition-transform"
            style={{
              backgroundColor: p.color,
              zIndex: 10 + idx
            }}
            title={p.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Tile;
