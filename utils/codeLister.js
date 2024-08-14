import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootPath = path.join(__dirname, '../');  // Root-Verzeichnis des Projekts
const markdownFilePath = path.join(__dirname, 'CODE_DOCUMENTATION.md');
const excludedDirectories = ['node_modules'];  // Verzeichnisse, die ausgeschlossen werden sollen

function generateMarkdown(directory) {
    let markdownContent = '# API Documentation\n\n';

    function readDirectory(dirPath) {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        entries.forEach(entry => {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                if (!excludedDirectories.includes(entry.name)) {
                    readDirectory(fullPath);
                }
            } else if (entry.isFile() && entry.name.endsWith('.js')) {
                const fileContent = fs.readFileSync(fullPath, 'utf8');
                markdownContent += `## ${fullPath}\n\n`;
                markdownContent += '```\n';
                markdownContent += fileContent;
                markdownContent += '\n```\n';
            }
        });
    }

    readDirectory(directory);

    fs.writeFileSync(markdownFilePath, markdownContent);
    console.log(`Documentation generated at ${markdownFilePath}`);
}

generateMarkdown(rootPath);