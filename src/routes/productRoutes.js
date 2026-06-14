const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// This defines the sub-route
router.get('/', productController.getAllProducts);

module.exports = router;