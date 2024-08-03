import * as fs from 'node:fs/promises';
import path from 'node:path';

const citiesFilePath = './generateCities/cities.txt';
const goodsFilePath = './generateCities/goods.txt';
const outputFilePath = './cities.json';

const readFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf8').trim().split('\n');
};

const generateGoods = async (goodsLines) => {
    return goodsLines.map((line, index) => {
        const name = line.trim();
        return {
            id: index + 1,
            name: name,
            amount: null,
            price: null
        };
    });
};

const generateJson = async () => {
    try {
        const citiesFileContent = await fs.readFile(citiesFilePath, 'utf-8');
        const goodsFileContent = await fs.readFile(goodsFilePath, 'utf-8');

        const cities = citiesFileContent.split('\n');
        const goodsLines = goodsFileContent.split('\n');

        const goods = await generateGoods(goodsLines);

        const result = cities.map((city, index) => ({
            id: index + 1,
            name: city.trim(),
            goods: goods
        }));

        return result;
    } catch (error) {
        console.error('Error generating JSON:', error);
        throw error;
    }
};

const writeJsonFile = async (data) => {
    fs.writeFile(outputFilePath, JSON.stringify(data, null, 2));
};

const data = await generateJson();
writeJsonFile(data);

console.log('JSON-Datei erfolgreich erstellt:', outputFilePath);