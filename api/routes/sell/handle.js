export function handle({ gameState: gameState }) {
    return (req, res) => {
        const { goodId, amount } = req.body;
        const currentCity = gameState.currentCity;

        const inventory = gameState.truck.find(g => g.id === goodId);
        if (!inventory || inventory.amount < amount) {
            return res.status(400).send('Not enough goods in inventory');
        }

        const good = currentCity.goods.find(g => g.id === goodId);
        if (!good) {
            return res.status(400).send('Goods not found');
        }

        const earnings = amount * good.price;
        inventory.amount -= amount;
        if (inventory.amount === 0) {
            gameState.truck = gameState.truck.filter(g => g.id !== goodId);
        }

        gameState.moneyAmount += earnings;
        res.json(gameState);
    };
}