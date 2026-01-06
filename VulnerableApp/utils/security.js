// utils/security.js
const crypto = require('crypto');

/**
 * Creates a semantic HMAC+Salt hash (PBKDF2 style or similar logic) for demo purpses,
 * or uses crypto.scrypt/pbkdf2 as best practice.
 * The prompt asks for HMAC + Salt.
 * We will use pbkdf2 which is standard, but if "HMAC + Salt" is strictly required as a manual construction:
 * proper way: HASH(password + salt) repeated?
 * We'll use crypto.pbkdf2Sync which uses HMAC-SHA512 internally.
 */

const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
};

const hashPassword = (password, salt) => {
    // strict requirement: HMAC + Salt.
    // crypto.pbkdf2Sync uses HMAC-SHA512 with the salt.
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
};

const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

// Requirement: "Hash this token using SHA-1 before storing/sending"
// Note: Usually we hash before storing, send raw to user.
// If prompt says "Hash... before storing/sending", it might mean handle it carefully.
// Standard secure flow: Store Hash(token), Send token. Verify Hash(input) == Store.
const hashToken = (token) => {
    return crypto.createHash('sha1').update(token).digest('hex');
};

module.exports = {
    generateSalt,
    hashPassword,
    generateToken,
    hashToken
};
