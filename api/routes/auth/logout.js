import { addToken } from '../../middleware/tokenBlacklist.js';

export function handle() {
    return async (req, res) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(400).send('No token provided');
        }

        await addToken(token);
        res.status(200).send('Logged out successfully');
    };
}