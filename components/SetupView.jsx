import React, { useState } from 'react';
import { Plus, Play, Users } from 'lucide-react';

const SetupView = ({ teams, onAddTeam, onStartGame }) => {
  const [newTeamName, setNewTeamName] = useState('');

  const handleAdd = () => {
    if (!newTeamName.trim()) return;
    onAddTeam(newTeamName);
    setNewTeamName('');
  };

  return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center p-4 z-50 overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 2 + 2 + 's',
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="bg-gray-800/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_80px_rgba(139,92,246,0.3)] w-full max-w-md border border-purple-500/30 text-center relative overflow-hidden z-10">
        {/* Glowing corners */}
        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-purple-400/50 rounded-tl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-blue-400/50 rounded-br-3xl"></div>

        

        {/* Title with hand-drawn underline */}
        <div className="relative inline-block mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg" style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.5px' }}>
            StartUp Monopoly
          </h1>
         
        </div>

        <p className="text-gray-300 mb-8 text-base" style={{ fontFamily: "'Georgia', serif" }}>
          Let's build your empire 
          <br />
          <span className="text-sm text-gray-400">(2-5 startups needed to begin)</span>
        </p>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Your epic startup name..."
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            maxLength={12}
            className="flex-1 bg-gray-900/80 border-2 border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-gray-900 transition-all shadow-inner"
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            onClick={handleAdd}
            disabled={!newTeamName.trim() || teams.length >= 5}
            className="bg-gradient-to-br from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white p-3 rounded-2xl transition-all shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-0.5 hover:scale-105"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>
        </div>

        <div className="space-y-3 mb-8 min-h-[140px]">
          {teams.map((t, idx) => (
            <div
              key={t.id}
              className="flex items-center gap-3 p-4 bg-gray-900/60 backdrop-blur rounded-2xl border-2 border-gray-700/50 shadow-lg transform transition-all duration-300 hover:bg-gray-900/80 hover:scale-[1.02] hover:shadow-xl animate-in slide-in-from-left-2 fade-in"
              style={{
                borderLeftColor: t.color,
                borderLeftWidth: '4px',
                animationDelay: `${idx * 100}ms`
              }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-gray-700" style={{ backgroundColor: t.color }}>
                {idx + 1}
              </div>
              <span className="font-semibold text-white text-lg">{t.name}</span>
              <div className="ml-auto text-xs opacity-50">✓</div>
            </div>
          ))}
          {teams.length === 0 && (
            <div className="text-gray-500 italic py-10 border-2 border-dashed border-gray-700 rounded-2xl bg-gray-900/30">
              <span className="text-4xl mb-2 block animate-bounce"></span>
              <span className="text-sm">Ready to dominate?</span>
            </div>
          )}
        </div>

        <button
          className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-purple-900/50 hover:shadow-xl hover:shadow-purple-900/70 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:translate-y-0 text-lg relative overflow-hidden group"
          onClick={onStartGame}
          disabled={teams.length < 2}
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
          <span className="relative z-10">
            {teams.length < 2 ? 'Need more teams...' : '🎲 Let\'s Go!'}
          </span>
        </button>

        {teams.length >= 1 && teams.length < 2 && (
          <p className="text-xs text-gray-400 mt-3 italic animate-pulse">Just one more team and we're ready! 👍</p>
        )}
      </div>
    </div>
  );
};

export default SetupView;
