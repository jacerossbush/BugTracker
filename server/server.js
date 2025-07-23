require('dotenv').config();
const express = require('express');
const {InitializeDatabase} = require('./db');


const app = express();
app.use(express.json());



app.get('/', (req, res) => {
    res.send('express is working baby');
});

async function startServer() {
    try {
        await InitializeDatabase();
        app.listen(process.env.DB_PORT, () => {
            console.log(`server is running on port ${process.env.DB_PORT}`);
        });
    }
    catch (err) {
        console.log('Failed to start Server: ', err);
        process.exit(1);
    }
}

startServer();