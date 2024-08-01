export function handle(gameState, citiesDB, randomizeHarbours) {
    return (req, res) => {
        const { cityId } = req.body;
        if (gameState.currentCity.id === cityId) {
            return res.status(400).send('You are already in this city');
        }

        const newCity = citiesDB.find(c => c.id === cityId);
        if (!newCity) {
            return res.status(404).send('City not found');
        }

        gameState.previousCity = gameState.currentCity;
        gameState.currentCity = newCity;
        randomizeHarbours([newCity]);
        res.json(gameState);
    };
}