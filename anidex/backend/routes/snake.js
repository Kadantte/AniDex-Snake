const express = require('express');
const multer = require('multer');
const {
    identifySnake,
    describeSnake,
    identifyByDescription
} = require('../controllers/snakeController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Route for identifying snake by image
router.post('/identify-image', upload.single('image'), identifySnake);

// Route for describing a snake
router.post('/describe', describeSnake);

// Route for identifying snake by description
router.post('/identify-description', identifyByDescription);

module.exports = router;
