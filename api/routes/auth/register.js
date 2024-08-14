import * as fs from 'node:fs/promises';
import bcrypt from 'bcryptjs';
import { initializeGame } from '../game/gameState.js';

export function handle({ usersDB, citiesDB }) {
    return async (req, res) => {
        const { username, password } = req.body;
        const existingUser = usersDB.find(user => user.username === username);

        if (existingUser) {
            return res.status(400).send('Username already taken');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (!citiesDB || citiesDB.length === 0) {
            return res.status(500).send('No cities available');
        }

        const gameState = initializeGame(citiesDB);

        const newUser = {
            id: usersDB.length + 1,
            username,
            password: hashedPassword,
            gameState
        };

        usersDB.push(newUser);

        try {
            await fs.writeFile('./users.json', JSON.stringify(usersDB, null, 2));
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).send('Error saving user data');
        }
    };
}