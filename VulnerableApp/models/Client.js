// models/Client.js
const db = require('../config/db');

class Client {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
        return rows;
    }

    static async create(name) {
        await db.query('INSERT INTO clients (name) VALUES (?)', [name]);
    }
}

module.exports = Client;
