const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json()); // Allows your app to read JSON payloads (critical for payments)

// Route Mounts
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

// Fallback Route for testing the root URL
app.get('/', (req, res) => {
  res.send('Averon Backend API is live, secure, and running.');
});

// Start Server Listen

// Diagnostic Catch-All Error Monitors (Forces hidden crashes to print to your terminal)
process.on('uncaughtException', (err) => {
  console.error('\n!!! CRITICAL RUNTIME ERROR DETECTED !!!');
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n!!! UNHANDLED PROMISE REJECTION DETECTED !!!');
  console.error(reason);
});

module.exports = app;