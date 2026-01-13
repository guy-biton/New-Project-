// controllers/inspectorController.js
const db = require('../config/db');

exports.getInspector = async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM users');
        const [clients] = await db.query('SELECT * FROM clients');

        res.render('inspector', { users, clients });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
    }
};
