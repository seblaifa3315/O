const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { loadDivers } = require('../controllers/diver');

router.route('/').get(protect, loadDivers);

module.exports = router;