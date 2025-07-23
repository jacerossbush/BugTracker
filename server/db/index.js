const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 10
});
console.log(pool.password);

async function InitializeDatabase() {
    // Test the database connection
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL database');
        try {
            const checkTableQuery = `
                SELECT EXISTS (
                    SELECT 1 FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'ReportedIssues'
                );
            `;
            const result = await client.query(checkTableQuery);
            const tableExists = result.rows[0].exists;
            if (!tableExists) {
                // Create ReportedIssues table if it doesn't exist
                const createTableQuery = `
                    CREATE TABLE ReportedIssues (
                        id SERIAL PRIMARY KEY,
                        issue_description TEXT NOT NULL,
                        reported_by VARCHAR(100) NOT NULL,
                        created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
                        status VARCHAR(50) DEFAULT 'open',
                        version VARCHAR(20) NOT NULL
                    );
                `;
                await client.query(createTableQuery);
                console.log('ReportedIssues table created successfully');
            } else {
                console.log('ReportedIssues table already exists');
            }

            return pool;
        } finally {
            // Release the client back to the pool
            client.release();
        }
    }
    catch (err) {
        console.log('Error Connecting to the database: ', err);
        throw err;
    }
}


module.exports = { InitializeDatabase, pool }