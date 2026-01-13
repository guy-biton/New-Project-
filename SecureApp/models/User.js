// models/User.js
const db = require('../config/db');

class User {
    static async create(username, email, passwordHash, salt) {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password_hash, salt) VALUES (?, ?, ?, ?)',
            [username, email, passwordHash, salt]
        );
        return result.insertId;
    }

    static async findByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async incrementFailedAttempts(id) {
        await db.query('UPDATE users SET failed_attempts = failed_attempts + 1 WHERE id = ?', [id]);
    }

    static async resetFailedAttempts(id) {
        await db.query('UPDATE users SET failed_attempts = 0, is_locked = FALSE, lock_until = NULL WHERE id = ?', [id]);
    }

    static async lockAccount(id, lockUntil) {
        await db.query('UPDATE users SET is_locked = TRUE, lock_until = ? WHERE id = ?', [lockUntil, id]);
    }

    // Password History Methods
    static async addPasswordHistory(userId, passwordHash, salt) {
        await db.query('INSERT INTO password_history (user_id, password_hash, salt) VALUES (?, ?, ?)', [userId, passwordHash, salt]);
    }

    static async getRecentPasswords(userId, limit) {
        const [rows] = await db.query('SELECT * FROM password_history WHERE user_id = ? ORDER BY created_at DESC LIMIT ?', [userId, limit]);
        return rows;
    }

    static async updatePassword(userId, passwordHash, salt) {
        await db.query('UPDATE users SET password_hash = ?, salt = ? WHERE id = ?', [passwordHash, salt, userId]);
    }

    // Forgot Password Methods
    static async setResetToken(userId, tokenHash, expires) {
        await db.query('UPDATE users SET reset_token_hash = ?, reset_token_expires = ? WHERE id = ?', [tokenHash, expires, userId]);
    }

    static async findByResetToken(tokenHash) {
        const [rows] = await db.query('SELECT * FROM users WHERE reset_token_hash = ? AND reset_token_expires > NOW()', [tokenHash]);
        return rows[0];
    }
}

module.exports = User;
