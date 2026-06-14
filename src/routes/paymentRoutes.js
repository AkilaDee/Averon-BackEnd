const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Main endpoint to authorize checkout charges and deduct stock allocation
router.post('/checkout', paymentController.processOrderPayment);

module.exports = router;