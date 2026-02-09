import React from 'react';
import { createRoot } from 'react-dom/client';
import Game from './components/Game.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);
