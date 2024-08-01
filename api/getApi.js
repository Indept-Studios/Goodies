import express from 'express';
import { handle as buy } from './routes/buy/handle.js';
import { handle as sell } from './routes/sell/handle.js';
import { handle as move } from './routes/move/handle.js';
import { handle as state } from './routes/state/handle.js';
import { handle as playerStats } from './routes/playerStats/handle.js';

function getApi({ gameState, citiesDB, randomizeHarbours }) {
    const api = express();
    api.use(express.json());

    api.get('/', (req, res) => {
        res.status(200).json({ playerStats: gameState, cities: citiesDB });
    });
    api.get('/current-state', (req, res) => state(req, res, gameState));
    api.post('/buy', (req, res) => buy(req, res, gameState));
    api.post('/sell', (req, res) => sell(req, res, gameState));
    api.post('/move', (req, res) => move(req, res, gameState, citiesDB, randomizeHarbours));
    api.get('/player-stats', (req, res) => playerStats(req, res, gameState));
    return api;
}

export { getApi };