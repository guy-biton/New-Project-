// controllers/searchController.js
const db = require('../config/db');

exports.getSearch = (req, res) => {
    res.render('sqli', { results: null, error: null, query: null, mode: null });
};

exports.vulnerableSearch = async (req, res) => {
    const { searchQuery } = req.body;
    // VULNERABLE: String concatenation
    const sql = "SELECT * FROM users WHERE username = '" + searchQuery + "'";

    try {
        // We use pool.query here.
        // Note: mysql2's pool.query still sends text protocol if arguments are not provided,
        // but explicit concatenation is the key here.
        // Also enabling multipleStatements: true in connection config might be needed for some SQLi payloads (like ; DROP TABLE),
        // but ' OR 1=1 # is enough to show bypass.

        // Using db.query(sql) directly.
        // Note: db.js exports pool.promise().

        const [rows] = await db.query(sql);
        res.render('sqli', { results: rows, error: null, query: sql, mode: 'Vulnerable' });
    } catch (err) {
        res.render('sqli', { results: null, error: err.message, query: sql, mode: 'Vulnerable' });
    }
};

exports.secureSearch = async (req, res) => {
    const { searchQuery } = req.body;
    // SECURE: Parameterized Query
    const sql = "SELECT * FROM users WHERE username = ?";

    try {
        const [rows] = await db.query(sql, [searchQuery]);
        res.render('sqli', { results: rows, error: null, query: "SELECT * FROM users WHERE username = ?", mode: 'Secure' });
    } catch (err) {
        res.render('sqli', { results: null, error: err.message, query: sql, mode: 'Secure' });
    }
};
