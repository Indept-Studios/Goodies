export function handle({ gameState }) {
    return (req, res) => {
        res.status(200).json({
            message: 'Game state retrieved successfully',
            status: 'SUCCESS',
            gameState
        });
    };
}