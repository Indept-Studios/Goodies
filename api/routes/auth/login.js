import bcrypt from 'bcryptjs';
import { generateToken } from '../../middleware/verifyToken.js';

export function handle({ usersDB }) {
    return (req, res) => {
        const { username, password } = req.body;
        const user = usersDB.find(user => user.username === username);

        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).send('Invalid credentials');
        }

        const token = generateToken({ id: user.id, username: user.username });

        res.status(200).send(token);
    };
}
