export function handle({ gameState }) {
    return (req, res) => {
        const { goodId, amount } = req.body;

        if (!goodId || amount <= 0) {
            return res.status(400).json({
                message: 'Invalid goodId or amount',
                status: 'INVALID_INPUT'
            });
        }

        const currentCity = gameState.currentCity;

        const good = currentCity.goods.find(g => g.id === goodId);
        if (!good) {
            return res.status(400).json({
                message: 'Goods not found',
                status: 'GOOD_NOT_FOUND'
            });
        }

        if (amount > good.amount) {
            return res.status(400).json({
                message: 'Not enough goods available',
                status: 'INSUFFICIENT_GOODS'
            });
        }

        const cost = amount * good.price;
        if (cost > gameState.moneyAmount) {
            return res.status(400).json({
                message: 'Not enough money to buy the goods',
                status: 'INSUFFICIENT_FUNDS'
            });
        }

        good.amount -= amount;
        gameState.moneyAmount -= cost;

        const inventory = gameState.truck.find(g => g.id === goodId);
        if (inventory) {
            inventory.amount += amount;
        } else {
            gameState.truck.push({ id: good.id, name: good.name, amount: amount });
        }

        res.json({
            message: 'Goods purchased successfully',
            status: 'PURCHASE_SUCCESS',
            gameState
        });
    };
}