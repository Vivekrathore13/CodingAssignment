const express = require('express');
const router = express.Router();
const { createContact, getContacts } = require('../controllers/contactController');
const verifyAdmin = require('../middlewares/authMiddleware');

router.post('/', createContact);
router.get('/', verifyAdmin, getContacts);

module.exports = router;
