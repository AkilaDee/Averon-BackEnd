const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
// const paymentRoutes = require('./routes/paymentRoutes'); <-- Add later

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Mount the API Routes
app.use('/api/products', productRoutes);

// Simple Health Check
app.get('/api/health', (req, res) => res.json({ status: 'healthy' }));

module.exports = app;