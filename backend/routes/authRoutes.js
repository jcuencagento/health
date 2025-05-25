const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
    res.send('Auth API OK hit');
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        const [existingUsers] = await db.query('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ error: 'Usuario o email ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        console.log('Usuario registrado:', username);
        res.json({ message: 'Usuario registrado correctamente!' });
    } catch (err) {
        console.error('Error en register:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        const [users] = await db.query('SELECT id, username, password FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Login incorrecto' });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Login incorrecto' });
        }

        res.json({ user: { id: user.id, username: user.username } });
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
