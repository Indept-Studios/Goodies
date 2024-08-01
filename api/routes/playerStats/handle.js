export function handle({ gameState, citiesDB }) {
    return (req, res) => {
        res.status(200).json({ playerStats: gameState, citys: citiesDB });
    };
}