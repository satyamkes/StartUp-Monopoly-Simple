export const BOARD_SIDE = 7; // 7x7 Grid
export const TOTAL_TILES = (BOARD_SIDE * 2) + ((BOARD_SIDE - 2) * 2); // 24 Tiles
export const STARTING_CASH = 2000;
export const MAX_TEAMS = 5;

export const TEAM_COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#d946ef'];

export const TILE_DATA = [
  { name: 'GO', type: 'start', price: 0 },
  { name: 'Gitlab', type: 'prop', price: 100, rent: 10 },
  { name: 'Heroku', type: 'prop', price: 120, rent: 12 },
  { name: 'Angel Investor', type: 'chance', price: 0 },
  { name: 'Docker', type: 'prop', price: 150, rent: 15 },
  { name: 'Kubernets', type: 'prop', price: 180, rent: 18 },
  { name: 'Networking', type: 'corner', price: 0 }, // Corner 1
  { name: 'Spotify', type: 'prop', price: 200, rent: 20 },
  { name: 'Slack', type: 'prop', price: 220, rent: 22 },
  { name: 'Zoom', type: 'prop', price: 240, rent: 24 },
  { name: 'Market Crash', type: 'chance', price: 0 },
  { name: 'Discord', type: 'prop', price: 260, rent: 26 },
  { name: 'Server Jail', type: 'corner', price: 0 }, // Corner 2
  { name: 'Uber', type: 'prop', price: 300, rent: 30 },
  { name: 'Airbnb', type: 'prop', price: 320, rent: 32 },
  { name: 'Series B', type: 'chance', price: 0 },
  { name: 'Netflix', type: 'prop', price: 350, rent: 35 },
  { name: 'TikTok', type: 'prop', price: 380, rent: 38 },
  { name: 'Tax Audit', type: 'corner', price: 0 }, // Corner 3
  { name: 'Meta', type: 'prop', price: 400, rent: 40 },
  { name: 'Amazon', type: 'prop', price: 420, rent: 42 },
  { name: 'Acquisition', type: 'chance', price: 0 },
  { name: 'Google', type: 'prop', price: 450, rent: 45 },
  { name: 'OpenAI', type: 'prop', price: 500, rent: 50 },
];
