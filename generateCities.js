import * as fs from 'node:fs';

const citiesFilePath = './generateCities\\cities.txt';
const goodsFilePath = './generateCities\\goods.txt';
const outputFilePath = './cities.json';

const readFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf8').trim().split('\n');
};

const parseGoods = (goodsLines) => {
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

const generateJson = () => {
    const cities = readFile(citiesFilePath);
    const goods = parseGoods(readFile(goodsFilePath));

    const result = cities.map((city, index) => ({
        id: index + 1,
        name: city.trim(),
        goods: goods
    }));

    return result;
};

const writeJsonFile = (data) => {
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
};

const data = generateJson();
writeJsonFile(data);

console.log('JSON-Datei erfolgreich erstellt:', outputFilePath);