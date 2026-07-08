const express = require('express');
const { getClasses, addClass } = require('../controllers/classController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getClasses);
router.post('/', authenticateToken, authorizeRole('admin'), addClass);

module.exports = router;
