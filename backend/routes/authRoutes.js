const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Example: Register route
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.query(
        'INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
            console.log(`Registering user: ${username} with result: ${result}`);
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ message: 'User registered!' });
        }
    );
});

module.exports = router;
