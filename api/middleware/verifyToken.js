import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checkToken } from './tokenBlacklist.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(user) {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '12h' });
}

export async function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const isBlacklisted = await checkToken(token);
        if (isBlacklisted) {
            return res.status(401).send('Token is blacklisted');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
}