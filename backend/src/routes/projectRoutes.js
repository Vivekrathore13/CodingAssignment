const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const verifyAdmin = require('../middlewares/authMiddleware');
const { upload, processImage } = require('../middlewares/fileUpload');

router.get('/', getProjects);
router.post('/', verifyAdmin, upload.single('image'), processImage, createProject);
router.put('/:id', verifyAdmin, updateProject);
router.delete('/:id', verifyAdmin, deleteProject);

module.exports = router;
