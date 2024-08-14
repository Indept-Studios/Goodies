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

        const inventory = gameState.truck.find(g => g.id === goodId);
        if (!inventory || inventory.amount < amount) {
            return res.status(400).json({
                message: 'Not enough goods in inventory',
                status: 'INSUFFICIENT_GOODS'
            });
        }

        const good = currentCity.goods.find(g => g.id === goodId);
        if (!good) {
            return res.status(400).json({
                message: 'Goods not found',
                status: 'GOOD_NOT_FOUND'
            });
        }

        const earnings = amount * good.price;
        inventory.amount -= amount;
        if (inventory.amount === 0) {
            gameState.truck = gameState.truck.filter(g => g.id !== goodId);
        }

        gameState.moneyAmount += earnings;
        res.json({
            message: 'Goods sold successfully',
            status: 'SALE_SUCCESS',
            gameState
        });
    };
}