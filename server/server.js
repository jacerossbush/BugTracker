require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const port = 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
const app = express();
app.use(express.json());

// Test the database connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL database');
    release(); // Release the client back to the pool
});

app.get('/', (req, res) => {
    res.send('express is working baby');
});

app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
}).on('error', (err) => {
    console.error('Server error:', err);
});