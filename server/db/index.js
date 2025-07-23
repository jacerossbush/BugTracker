const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 10
});


async function InitializeDatabase() {
    // Test the database connection
    try {
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            console.log('Connected to PostgreSQL database');
            release(); // Release the client back to the pool
        });
        return pool;
    }
    catch (err) {
        console.log('Error Connecting to the database: ', err);
        throw err;
    }
}


module.exports = { InitializeDatabase, pool }