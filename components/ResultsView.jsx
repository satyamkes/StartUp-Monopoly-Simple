import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

const ResultsView = ({ teams, onReset }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center p-8 text-white z-50">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8 drop-shadow-sm text-center">
        MARKET REPORT
      </h1>
      <div className="relative mb-12">
        <Trophy size={80} className="text-yellow-400 animate-bounce" />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-2 bg-yellow-500/30 blur-xl rounded-full"></div>
      </div>

      <div className="w-full max-w-2xl grid gap-4 mb-12">
        {teams.map((team, index) => (
          <div
            key={team.id}
            className="flex items-center p-4 bg-gray-800 rounded-xl border border-gray-700 shadow-xl transition-all duration-500 hover:bg-gray-750"
            style={{
              transform: `scale(${1 - (index * 0.03)})`,
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-6 shadow-lg ${index === 0 ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-gray-400'}`}>
              #{index + 1}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1" style={{ color: team.color }}>{team.name}</h2>
              <div className="flex gap-4 text-sm text-gray-400">
                <span>Cash: <span className="text-white">₹{team.cash}</span></span>
                <span>Properties: <span className="text-white">{team.properties.length}</span></span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Net Worth</div>
              <div className="text-2xl font-mono text-green-400">₹{team.netWorth}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="flex items-center gap-2 px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-bold transition-colors shadow-lg hover:shadow-gray-700/50"
        onClick={onReset}
      >
        <RotateCcw size={20} /> New Game
      </button>
    </div>
  );
};

export default ResultsView;
