require('dotenv').config();
console.log("==================================================");
console.log("🔥 CRITICAL NATIVE CHECK 🔥");
console.log("RAW ENV URL:", process.env.DATABASE_URL);
console.log("==================================================");

require('dotenv').config(); 
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`[SERVER] Averon Backend live on port ${PORT}`);
  console.log(`==================================================`);
});

// Diagnostic Catch-All Error Monitors 
process.on('uncaughtException', (err) => {
  console.error('\n!!! CRITICAL RUNTIME ERROR DETECTED !!!');
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n!!! UNHANDLED PROMISE REJECTION DETECTED !!!');
  console.error(reason);
});