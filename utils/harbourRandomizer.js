import { randomInt } from './random.js';

export function randomizeHarbours(citiesDB) {
    for (const city of citiesDB) {
        for (const good of city.goods) {
            good.amount = randomInt(0, 10);
            good.price = randomInt(1, 10);
        }
    }
}