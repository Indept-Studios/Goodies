import fs from 'fs/promises';
import path from 'path';

const blacklistFilePath = path.resolve('./tokenBlacklist.json');

async function readBlacklist() {
    try {
        const data = await fs.readFile(blacklistFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
        }
        throw err;
    }
}

async function writeBlacklist(blacklist) {
    await fs.writeFile(blacklistFilePath, JSON.stringify(blacklist, null, 2));
}

export async function addToken(token) {
    const blacklist = await readBlacklist();
    if (!blacklist.includes(token)) {
        blacklist.push(token);
        await writeBlacklist(blacklist);
    }
}

export async function checkToken(token) {
    const blacklist = await readBlacklist();
    return blacklist.includes(token);
}