import React, { useEffect, useRef } from 'react';
import { DollarSign, Building2 } from 'lucide-react';

const Sidebar = ({ teams, currentPlayerIdx, log, onEndGame }) => {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  return (
    <div className="w-full md:w-80 flex flex-col gap-4 bg-gray-800 border-l border-gray-700 p-4 h-full shadow-xl z-30">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-white tracking-wide">Leaderboard</h3>
        <button
          onClick={onEndGame}
          className="text-xs px-3 py-1 bg-red-900/50 text-red-400 border border-red-800 rounded hover:bg-red-900 transition-colors"
        >
          End Game
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
        {teams.map((p, idx) => (
          <div
            key={p.id}
            className={`p-3 rounded-lg border-l-4 bg-gray-700/50 transition-all duration-300 ${idx === currentPlayerIdx ? 'border-white bg-gray-700 shadow-lg transform scale-[1.02]' : 'border-transparent opacity-80 hover:opacity-100'}`}
            style={{ borderColor: idx === currentPlayerIdx ? p.color : 'transparent', borderLeftColor: p.color }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm" style={{ backgroundColor: p.color }}>
                  {p.name.charAt(0)}
                </div>
                <span className="font-bold text-white truncate max-w-[120px]">{p.name}</span>
              </div>
              {idx === currentPlayerIdx && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-white/10 text-white rounded-full animate-pulse">TURN</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <DollarSign size={14} className="text-green-400" />
                <span className="font-mono">₹{p.cash}</span>
              </div>
              <div className="flex items-center gap-1">
                <Building2 size={14} className="text-blue-400" />
                <span>{p.properties.length} Props</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-gray-900 rounded-lg p-3 border border-gray-700 flex flex-col h-1/3">
        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider sticky top-0 bg-gray-900 pb-1">Market Feed</h4>
        <ul className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
          {log.map((l, i) => (
            <li key={i} className="text-xs font-mono text-green-400/90 border-b border-gray-800 pb-1 last:border-0">
              <span className="opacity-50 mr-2 select-none">›</span>
              {l}
            </li>
          ))}
          <div ref={logEndRef} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
