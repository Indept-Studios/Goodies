import express from 'express';
import * as fs from 'node:fs/promises';
import dotenv from 'dotenv';
import { getApi } from './api/getApi.js';
import { initializeGame } from './api/routes/game/gameState.js';
import { randomizeHarbours } from './utils/harbourRandomizer.js';

dotenv.config();

const port = process.env.PORT || 3000;

(async () => {
    try {
        const [cityJSONFileContent, userJSONFileContent] = await Promise.all([
            fs.readFile('./cities.json', 'utf-8'),
            fs.readFile('./users.json', 'utf-8')
        ]);
        const citiesDB = JSON.parse(cityJSONFileContent);
        const usersDB = JSON.parse(userJSONFileContent);

        const gameState = initializeGame(citiesDB);

        const api = getApi({ gameState, citiesDB, usersDB, randomizeHarbours });

        const app = express();
        app.use(express.json());

        app.use((req, res, next) => {
            console.log(`${req.method} ${req.url} ${req.ip}`);
            next();
        });

        app.get('/', (req, res) => {
            res.status(200).send('Welcome to the Truck Game API. Use /api for API routes.');
        });

        app.use('/api', api);

        app.use((err, req, res, next) => {
            console.error('Unhandled Error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });

        app.listen(port, () => {
            console.log(`Server started on Port: ${port} in ${process.env.NODE_ENV || 'development'} mode`);
        });
    } catch (error) {
        console.error('Error initializing the server:', error);
        if (error.code === 'ENOENT') {
            console.error('One of the required files (cities.json or users.json) is missing.');
        } else if (error instanceof SyntaxError) {
            console.error('Invalid JSON format in one of the files.');
        }
        process.exit(1);
    }
})();