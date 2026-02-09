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
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-md border-2 border-orange-200 text-center relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-3 left-3 w-12 h-12 border-l-4 border-t-4 border-orange-400 rounded-tl-2xl opacity-60"></div>
        <div className="absolute bottom-3 right-3 w-12 h-12 border-r-4 border-b-4 border-orange-400 rounded-br-2xl opacity-60"></div>

        {/* Hand-drawn style underline */}
        <div className="relative inline-block mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-1" style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.5px' }}>
            StartUp Monopoly
          </h1>
          <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 300 8">
            <path d="M 5 5 Q 75 2, 150 4 T 295 5" stroke="#fb923c" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <p className="text-gray-600 mb-8 text-base" style={{ fontFamily: "'Georgia', serif" }}>
          Let's build your teams ✨
          <br />
          <span className="text-sm text-gray-500">(2-5 startups needed)</span>
        </p>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Your startup name here..."
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            maxLength={12}
            className="flex-1 bg-amber-50 border-2 border-orange-300 rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all shadow-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            onClick={handleAdd}
            disabled={!newTeamName.trim() || teams.length >= 5}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white p-3 rounded-2xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>
        </div>

        <div className="space-y-3 mb-8 min-h-[140px]">
          {teams.map((t, idx) => (
            <div
              key={t.id}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-white to-orange-50 rounded-2xl border-2 shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              style={{ borderColor: t.color, borderLeftWidth: '6px' }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md" style={{ backgroundColor: t.color }}>
                {idx + 1}
              </div>
              <span className="font-semibold text-gray-800 text-lg">{t.name}</span>
            </div>
          ))}
          {teams.length === 0 && (
            <div className="text-gray-400 italic py-10 border-2 border-dashed border-orange-200 rounded-2xl bg-orange-50/30">
              <span className="text-3xl mb-2 block">🚀</span>
              Ready when you are!
            </div>
          )}
        </div>

        <button
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:translate-y-0 text-lg"
          onClick={onStartGame}
          disabled={teams.length < 2}
        >
          {teams.length < 2 ? 'Need more teams...' : 'Let\'s Play! 🎲'}
        </button>

        {teams.length >= 1 && teams.length < 2 && (
          <p className="text-xs text-gray-500 mt-3 italic">Add one more team to start</p>
        )}
      </div>
    </div>
  );
};

export default SetupView;
