import express from 'express';
import * as fs from 'node:fs/promises';
import { getApi } from './api/getApi.js';
import { randomInt } from './utils/random.js';
import dotenv from 'dotenv';

dotenv.config(); // Lädt Umgebungsvariablen aus einer .env-Datei

const port = process.env.PORT || 3000;

(async () => {
    try {
        const cityJSONFileContent = await fs.readFile('./cities.json');
        const citiesDB = JSON.parse(cityJSONFileContent);

        const gameState = {
            moneyAmount: null,
            currentCity: null,
            truck: [],
            previousCity: null
        };

        function randomizeHarbours(citiesDB) {
            for (const city of citiesDB) {
                for (const good of city.goods) {
                    good.amount = randomInt(0, 10);
                    good.price = randomInt(1, 10);
                }
            }
        }

        function initializeGame() {
            gameState.currentCity = citiesDB[0];
            gameState.previousCity = null;
            gameState.moneyAmount = 10;
            gameState.truck = [];
            randomizeHarbours(citiesDB);
        }

        initializeGame();

        const api = getApi({ gameState, citiesDB, randomizeHarbours });

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

        app.listen(port, () => {
            console.log(`Server started on Port: ${port}`);
        });
    } catch (error) {
        console.error('Error initializing the server:', error);
        process.exit(1);
    }
})();