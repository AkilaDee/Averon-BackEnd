const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// OPTIONAL: Swap app.use(cors()) for this if you want to restrict origins safely:
app.use(cors({
  origin: ['https://www.averonsupplies.co.uk'],
  credentials: true
}));

app.use(express.json()); 

app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('Averon Backend API is live, secure, and running.');
});

module.exports = app;