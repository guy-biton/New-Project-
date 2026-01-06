// setup_db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
};

async function setup() {
    let connection;
    try {
        console.log('Connecting to MySQL server...');
        connection = await mysql.createConnection(dbConfig);

        console.log(`Creating database '${process.env.DB_NAME || 'comunication_ltd'}' if it doesn't exist...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'comunication_ltd'}\``);
        console.log('Database created or already exists.');

        await connection.end();

        // Now run the table initialization
        console.log('Initializing tables...');
        require('./init_db'); // This script (created earlier) connects to the database and creates tables.

    } catch (err) {
        console.error('Error during setup:', err);
        if (err.code === 'ECONNREFUSED') {
            console.error('\nERROR: Could not connect to MySQL. Please ensure MySQL Server is installed and running.');
            console.error('If you are using XAMPP, ensure "MySQL" is started in the control panel.');
        }
        process.exit(1);
    }
}

setup();
