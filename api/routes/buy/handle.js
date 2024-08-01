export function handle(gameState) {
    return (req, res) => {
        const { goodId, amount } = req.body;
        const currentCity = gameState.currentCity;

        const good = currentCity.goods.find(g => g.id === goodId);
        if (!good) {
            return res.status(400).send('Goods not found');
        }
        if (amount > good.amount) {
            return res.status(400).send('Not enough goods');
        }
        const cost = amount * good.price;
        if (cost > gameState.moneyAmount) {
            return res.status(400).send('Not enough money');
        }

        good.amount -= amount;
        gameState.moneyAmount -= cost;

        const inventory = gameState.truck.find(g => g.id === goodId);
        if (inventory) {
            inventory.amount += amount;
        } else {
            gameState.truck.push({ id: good.id, name: good.name, amount: amount });
        }

        res.json(gameState);
    };
}