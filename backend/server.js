const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api', (req, res) => {
    console.log('API endpoint hit');
    res.send('API is running... Hello World!');
});

app.use(express.static(path.join(__dirname, '../frontend', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
