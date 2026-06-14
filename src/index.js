require('dotenv').config(); // Loads .env from your root folder
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[SERVER] Running cleanly in production mode on port ${PORT}`);
});