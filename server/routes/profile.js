const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { updateProfile } = require('../controllers/profile');

router.route('/').put(protect, updateProfile);

module.exports = router;