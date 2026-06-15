require('dotenv').config();
const app = require('./app'); // Pulls in everything from app.js

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[SERVER] Averon Backend live on port ${PORT}`);
});