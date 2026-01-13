// models/Client.js
const db = require('../config/db');

class Client {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
        return rows;
    }

    static async search(query) {
        // SECURE: Use parameterized query (?) to prevent SQL Injection
        const sql = 'SELECT * FROM clients WHERE name LIKE ? ORDER BY created_at DESC';
        const [rows] = await db.query(sql, [`%${query}%`]);
        return rows;
    }

    static async create(name) {
        await db.query('INSERT INTO clients (name) VALUES (?)', [name]);
    }
}

module.exports = Client;
