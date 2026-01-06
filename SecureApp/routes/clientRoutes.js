// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/', clientController.getClients);
router.post('/add', clientController.addClientVulnerable); // We just need one add for Stored XSS, usually.

module.exports = router;
