const express = require('express');
const router = express.Router();
const { subscribe, getSubscribers } = require('../controllers/newsletterController');
const verifyAdmin = require('../middlewares/authMiddleware');

router.post('/', subscribe);
router.get('/', verifyAdmin, getSubscribers);

module.exports = router;
