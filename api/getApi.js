import express from 'express';
import { verifyToken } from './middleware/verifyToken.js';
import { handle as buy } from './routes/buy/handle.js';
import { handle as sell } from './routes/sell/handle.js';
import { handle as move } from './routes/move/handle.js';
import { handle as state } from './routes/state/handle.js';
import { handle as register } from './routes/auth/register.js';
import { handle as login } from './routes/auth/login.js';
import { handle as logout } from './routes/auth/logout.js';

function getApi({ gameState, citiesDB, randomizeHarbours, usersDB }) {
    const api = express();
    api.use(express.json());

    api.post('/register', register({ usersDB, citiesDB }));
    api.post('/login', login({ usersDB }));
    api.post('/logout', logout({ usersDB }));

    api.use('/', verifyToken);

    api.get('/', (req, res) => {
        res.status(200).json({ playerStats: gameState, cities: citiesDB });
    });

    api.get('/state', state({ gameState }));
    api.post('/buy', buy({ gameState }));
    api.post('/sell', sell({ gameState }));
    api.post('/move', move({ gameState, citiesDB, randomizeHarbours }));

    return api;
}

export { getApi };