import React, { useState, useEffect } from 'react';
import { TOTAL_TILES, STARTING_CASH, MAX_TEAMS, TEAM_COLORS, TILE_DATA } from '../constants.js';
import SetupView from './SetupView.jsx';
import ResultsView from './ResultsView.jsx';
import Board from './Board.jsx';
import Sidebar from './Sidebar.jsx';

const Game = () => {
  // PHASE: 'SETUP', 'PLAY', 'RESULTS'
  const [phase, setPhase] = useState('SETUP');

  // STATE
  const [teams, setTeams] = useState([]);
  const [tiles, setTiles] = useState([]);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);
  const [turnState, setTurnState] = useState('ROLL'); // ROLL, BUY, END
  const [log, setLog] = useState([]);

  // --- INITIALIZATION ---
  useEffect(() => {
    // Generate board state from data
    const initialTiles = TILE_DATA.map((t, i) => ({
      id: i,
      ...t,
      owner: null,
      color: i < 7 ? '#a5b4fc' : i < 13 ? '#86efac' : i < 19 ? '#fca5a5' : '#fde047'
    }));
    setTiles(initialTiles);
  }, []);

  // --- ACTIONS ---
  const addLog = (msg) => setLog(prev => [...prev, msg]); // Append to end for scrolling

  const handleAddTeam = (name) => {
    if (teams.length >= MAX_TEAMS) return;

    const newTeam = {
      id: Date.now(),
      name: name,
      color: TEAM_COLORS[teams.length],
      cash: STARTING_CASH,
      pos: 0,
      properties: [],
      netWorth: STARTING_CASH
    };

    setTeams([...teams, newTeam]);
  };

  const handleStartGame = () => {
    if (teams.length < 2) {
      return;
    }
    setPhase('PLAY');
    addLog("Market Open! Game Started.");
  };

  const calculateNetWorth = (team) => {
    const propertyValue = team.properties.reduce((acc, curr) => acc + curr.price, 0);
    return team.cash + propertyValue;
  };

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);

    const newTeams = [...teams];
    const player = newTeams[currentPlayerIdx];

    // Move
    let newPos = (player.pos + roll) % TOTAL_TILES;

    // Pass Go
    if (newPos < player.pos) {
      player.cash += 300;
      addLog(`${player.name} passed GO! +₹300 funding.`);
    }
    player.pos = newPos;
    player.netWorth = calculateNetWorth(player);
    setTeams(newTeams);

    // Handle Landing
    const tile = tiles[newPos];
    if (tile.type === 'prop') {
      if (tile.owner === null) {
        setTurnState('BUY');
      } else if (tile.owner !== player.id) {
        payRent(currentPlayerIdx, tile);
        setTurnState('END');
      } else {
        setTurnState('END');
      }
    } else {
      handleChance(tile);
      setTurnState('END');
    }
  };

  const handleChance = (tile) => {
    if (tile.type === 'chance') {
      const luck = Math.random() > 0.5;
      const amount = 100;
      const newTeams = [...teams];
      if (luck) {
        newTeams[currentPlayerIdx].cash += amount;
        addLog(`${teams[currentPlayerIdx].name} got an investment grant! +₹${amount}`);
      } else {
        newTeams[currentPlayerIdx].cash -= amount;
        addLog(`${teams[currentPlayerIdx].name} paid legal fees. -₹${amount}`);
      }
      setTeams(newTeams);
    }
  };

  const buyProperty = () => {
    const player = teams[currentPlayerIdx];
    const tile = tiles[player.pos];

    if (player.cash >= tile.price) {
      const newTeams = [...teams];
      newTeams[currentPlayerIdx].cash -= tile.price;
      newTeams[currentPlayerIdx].properties.push(tile);
      newTeams[currentPlayerIdx].netWorth = calculateNetWorth(newTeams[currentPlayerIdx]);

      const newTiles = [...tiles];
      newTiles[player.pos].owner = player.id;

      setTeams(newTeams);
      setTiles(newTiles);
      addLog(`${player.name} acquired ${tile.name} for ₹${tile.price}`);
      setTurnState('END');
    } else {
      alert("Insufficient Capital!");
    }
  };

  const payRent = (payerIdx, tile) => {
    const owner = teams.find(t => t.id === tile.owner);
    const rent = tile.rent;
    const newTeams = [...teams];

    newTeams[payerIdx].cash -= rent;
    const ownerIdx = newTeams.findIndex(t => t.id === owner.id);
    newTeams[ownerIdx].cash += rent;

    // Update Net Worths
    newTeams[payerIdx].netWorth = calculateNetWorth(newTeams[payerIdx]);
    newTeams[ownerIdx].netWorth = calculateNetWorth(newTeams[ownerIdx]);

    setTeams(newTeams);
    addLog(`${teams[payerIdx].name} paid ₹${rent} usage fees to ${owner.name}`);
  };

  const endTurn = () => {
    setDiceRoll(null);
    setCurrentPlayerIdx((prev) => (prev + 1) % teams.length);
    setTurnState('ROLL');
  };

  const endGame = () => {
    // Recalculate final standings
    const finalTeams = teams.map(t => ({
      ...t,
      netWorth: calculateNetWorth(t)
    })).sort((a, b) => b.netWorth - a.netWorth);

    setTeams(finalTeams);
    setPhase('RESULTS');
  };

  const resetGame = () => {
    setTeams([]);
    setPhase('SETUP');
    setLog([]);
    setTiles(TILE_DATA.map((t, i) => ({ ...t, id: i, owner: null })));
  };

  // --- RENDER ---

  if (phase === 'SETUP') {
    return (
      <SetupView
        teams={teams}
        onAddTeam={handleAddTeam}
        onStartGame={handleStartGame}
      />
    );
  }

  if (phase === 'RESULTS') {
    return (
      <ResultsView
        teams={teams}
        onReset={resetGame}
      />
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-950 text-white overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-2 md:p-6 bg-gray-950">
        <Board
          tiles={tiles}
          teams={teams}
          currentPlayer={teams[currentPlayerIdx]}
          turnState={turnState}
          diceRoll={diceRoll}
          onRoll={rollDice}
          onBuy={buyProperty}
          onPass={() => setTurnState('END')}
          onNextTurn={endTurn}
        />
      </div>
      <Sidebar
        teams={teams}
        currentPlayerIdx={currentPlayerIdx}
        log={log}
        onEndGame={endGame}
      />
    </div>
  );
};

export default Game;
