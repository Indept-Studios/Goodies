import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootPath = path.join(__dirname, '../');
const markdownFilePath = path.join(__dirname, 'API_DOCUMENTATION.md');
const excludedDirectories = ['node_modules'];

function generateMarkdown(directory) {
    let markdownContent = '# API Documentation\n\n';

    function extractRouteInfo(fileContent) {
        const routePattern = /app\.(get|post|put|delete)\(['"](.*?)['"],\s*\(req,\s*res\)\s*=>\s*{[^}]*}/g;
        const responsePattern = /res\.status\((\d+)\)\.send\(['"](.*?)['"]/g;
        const parameterPattern = /req\.body\.(\w+)/g;

        let routeInfo = '';
        let match;

        while ((match = routePattern.exec(fileContent)) !== null) {
            const method = match[1].toUpperCase();
            const endpoint = match[2];
            routeInfo += `## ${method} ${endpoint}\n\n`;

            let paramsMatch;
            const params = [];
            while ((paramsMatch = parameterPattern.exec(fileContent)) !== null) {
                params.push(paramsMatch[1]);
            }
            if (params.length) {
                routeInfo += '**Parameters:**\n';
                params.forEach(param => {
                    routeInfo += `- \`${param}\`: Description\n`;
                });
                routeInfo += '\n';
            }

            let responsesMatch;
            const responses = [];
            while ((responsesMatch = responsePattern.exec(fileContent)) !== null) {
                responses.push({ status: responsesMatch[1], description: responsesMatch[2] });
            }
            if (responses.length) {
                routeInfo += '**Responses:**\n';
                responses.forEach(response => {
                    routeInfo += `- \`${response.status}\`: ${response.description}\n`;
                });
                routeInfo += '\n';
            }
        }

        return routeInfo;
    }

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
                const routeInfo = extractRouteInfo(fileContent);
                if (routeInfo) {
                    markdownContent += `### ${fullPath}\n\n`;
                    markdownContent += routeInfo;
                }
            }
        });
    }

    readDirectory(directory);

    fs.writeFileSync(markdownFilePath, markdownContent);
    console.log(`Documentation generated at ${markdownFilePath}`);
}

generateMarkdown(rootPath);