const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { loadDivers, loadTheDiver } = require('../controllers/diver');

router.route('/').get(protect, loadDivers);
router.route('/:diverId').get(protect, loadTheDiver);

module.exports = router;