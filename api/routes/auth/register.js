import * as fs from 'node:fs/promises';

export function handle({ usersDB }) {
    return async (req, res) => {
        const { username, password } = req.body;
        const existingUser = usersDB.find(user => user.username === username);

        if (existingUser) {
            return res.status(400).send('Username already taken');
        }

        const newUser = {
            id: usersDB.length + 1,
            username,
            password,
            gameState: {
                moneyAmount: 10,
                currentCity: null,
                truck: [],
                previousCity: null
            }
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