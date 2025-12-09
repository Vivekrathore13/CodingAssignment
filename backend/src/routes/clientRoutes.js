const express = require('express');
const router = express.Router();
const { getClients, createClient, updateClient, deleteClient } = require('../controllers/clientController');
const verifyAdmin = require('../middlewares/authMiddleware');
const { upload, processImage } = require('../middlewares/fileUpload');

router.get('/', getClients);
router.post('/', verifyAdmin, upload.single('image'), processImage, createClient);
router.put('/:id', verifyAdmin, updateClient);
router.delete('/:id', verifyAdmin, deleteClient);

module.exports = router;
