const express = require('express');
const multer = require('multer');
const { identifySnake, describeSnake } = require('../controllers/snakeController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/identify-image', upload.single('image'), identifySnake);
router.post('/describe', describeSnake);

module.exports = router;
