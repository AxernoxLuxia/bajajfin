import express from "express";
import path from "path";

const app = express();
const port = 3000;

const __dirname = path.resolve();

// Middleware to parse JSON bodies
app.use(express.json());

// POST method for /bfhl
app.post("/bfhl", (req, res) => {
    const { data } = req.body;

    // Extracting numbers and alphabets from the data array
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));

    // Logic to determine the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(
        (char) => char >= "a" && char <= "z"
    );
    const highestLowercase = lowercaseAlphabets.sort().pop();

    // User details (Hardcoded for the example)
    const user_id = "john_doe_17091999";
    const email = "john@xyz.com";
    const roll_number = "ABCD123";

    res.status(200).json({
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: [highestLowercase || []],
    });
});

app.use(express.static(path.join(__dirname, "dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// GET method for /bfhl
app.get("/bfhl", (req, res) => {
    res.status(200).json({
        operation_code: 1,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
