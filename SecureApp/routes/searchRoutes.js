// routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/', searchController.getSearch);
router.post('/vulnerable', searchController.vulnerableSearch);
router.post('/secure', searchController.secureSearch);

module.exports = router;
