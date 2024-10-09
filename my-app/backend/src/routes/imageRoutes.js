// src/routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const authenticateSession = require('../middleware/auth');
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', authenticateSession, upload.single('image'), imageController.uploadImage);
router.get('/', authenticateSession, imageController.getImages);

module.exports = router;
