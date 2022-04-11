const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { loadDivers, loadTheDiver, updateDiver } = require('../controllers/diver');

router.route('/').get(protect, loadDivers);
router.route('/:diverId').get(protect, loadTheDiver);
router.route('/:diverId').put(protect, updateDiver);

module.exports = router;