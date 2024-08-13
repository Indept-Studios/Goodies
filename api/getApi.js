import express from 'express';
import { handle as buy } from './routes/buy/handle.js';
import { handle as game } from './routes/game/handle.js';
import { handle as sell } from './routes/sell/handle.js';
import { handle as move } from './routes/move/handle.js';
import { handle as state } from './routes/state/handle.js';

function getApi({ gameState, citiesDB, randomizeHarbours }) {
    const api = express();
    api.use(express.json());

    api.get('/', (req, res) => {
        res.status(200).json({ playerStats: gameState, cities: citiesDB });
    });
    api.get('/game', game({ gameState }));
    api.get('/state', state({ gameState }));
    api.post('/buy', buy({ gameState }));
    api.post('/sell', sell({ gameState }));
    api.post('/move', move({ gameState, citiesDB, randomizeHarbours }));

    return api;
}

export { getApi };