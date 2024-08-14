export function handle({ gameState, citiesDB, randomizeHarbours }) {
    return (req, res) => {
        const { cityId } = req.body;

        if (gameState.currentCity.id === cityId) {
            return res.status(200).json({
                message: 'You are already in this city',
                city: gameState.currentCity,
                status: 'ALREADY_IN_CITY'
            });
        }

        const newCity = citiesDB.find(c => c.id === cityId);
        if (!newCity) {
            return res.status(404).send('City not found');
        }

        gameState.previousCity = gameState.currentCity;
        gameState.currentCity = newCity;
        randomizeHarbours([newCity]);

        res.json({
            message: 'Moved to new city',
            gameState
        });
    };
}