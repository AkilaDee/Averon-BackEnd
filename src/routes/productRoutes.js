const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get the combined inventory view (Product -> Variant -> Grade)
router.get('/', productController.getAllProducts);

module.exports = router;