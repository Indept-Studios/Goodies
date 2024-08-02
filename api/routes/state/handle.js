export function handle({gameState}) {
    return (req, res) => {
        res.status(200).json(gameState);
    };
}