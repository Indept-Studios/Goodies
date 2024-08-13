export function handle({ usersDB }) {
    return (req, res) => {
        const { username, password } = req.body;
        const user = usersDB.find(user => user.username === username && user.password === password);

        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        // In a real app, generate and return a JWT here
        const token = "mocked-jwt-token"; // Replace with real JWT generation

        res.status(200).json({ message: 'Login successful', token });
    };
}