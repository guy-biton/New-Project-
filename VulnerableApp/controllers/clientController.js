// controllers/clientController.js
const Client = require('../models/Client');
const db = require('../config/db');

exports.getClients = async (req, res) => {
    // VULNERABLE: SQL Injection in Search
    const searchQuery = req.query.search;
    let sql = 'SELECT * FROM clients';

    // Vulnerable Search Logic
    if (searchQuery) {
        sql += ` WHERE name LIKE '%${searchQuery}%'`;
    }

    try {
        const [clients] = await db.query(sql);
        res.render('clients', { clients, searchQuery, error: null });
    } catch (err) {
        console.error(err);
        // If SQLi causes error, show it (helpful for demo)
        res.render('clients', { clients: [], searchQuery, error: 'Database Error: ' + err.message });
    }
};

exports.addClientVulnerable = async (req, res) => {
    const { name } = req.body;
    try {
        await Client.create(name);
        res.redirect('/clients');
    } catch (err) {
        res.render('clients', { clients: [], searchQuery: '', error: 'Error adding client' });
    }
};

exports.addClientSecure = async (req, res) => {
    const { name } = req.body;
    try {
        // Secure: We COULD sanitize here (Input Validation/Sanitization).
        // Or we rely on Output Encoding.
        // For demonstration, let's just insert it as is, but we will rely on the VIEW to render it securely.
        // OR we can sanitize it here using a library like DOMPurify or just strip tags.
        // The prompt says: "Secure Version: Implement Output Encoding/Sanitization."
        // "Render the data using escaped tags (e.g., <%= clientName %>) or a server-side encoding function"
        // So the controller logic might be the same, but the VIEW logic changes?
        // OR we sanitize BEFORE saving?
        // Let's stick to the prompt: "Render the data using escaped tags".
        // SO actually, the controller is the same! The VIEW differentiates the "Vulnerable" vs "Secure" display?
        // Wait, Scenario 2 Prompt:
        // "Vulnerable Version: Accept... and render it directly... <%- clientName %>"
        // "Secure Version: ... Render the data using escaped tags... <%= clientName %>"
        // So the "Vulnerable" vs "Secure" is mostly in the VIEW.
        // BUT also valid to sanitize on input.
        // Let's keep the controller simple (just add) and show the diff in the View.
        // BUT to have separate "Vulnerable" and "Secure" *actions*?
        // No, the prompt says "System Screen to add a new client and display their name".
        // It implies one list, displayed differently? Or two lists?
        // Let's do: Add Client Form (Shared).
        // Display:
        // 1. Vulnerable List (renders with <%- %>)
        // 2. Secure List (renders with <%= %>)

        await Client.create(name);
        res.redirect('/demo/xss');
    } catch (err) {
         res.render('xss', { clients: [], error: 'Error adding client' });
    }
};
