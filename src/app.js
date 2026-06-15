const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// OPTIONAL: Swap app.use(cors()) for this if you want to restrict origins safely:
app.use(cors({
  origin: ['http://localhost:5137', 'http://127.0.0.1:5137', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json()); 

app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('Averon Backend API is live, secure, and running.');
});

module.exports = app;