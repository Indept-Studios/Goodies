import { randomizeHarbours } from '../../../utils/harbourRandomizer.js';

export function initializeGame(citiesDB) {
    const gameState = {
        moneyAmount: 10,
        currentCity: citiesDB[0],
        truck: [],
        previousCity: null
    };
    randomizeHarbours(citiesDB);
    return gameState;
}