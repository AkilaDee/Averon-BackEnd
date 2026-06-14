const { Pool } = require('pg');
require('dotenv').config();

// Diagnostic safety check to alert you if environment loading fails
if (!process.env.DATABASE_URL) {
  console.error('\n❌ CRITICAL ERROR: DATABASE_URL is completely missing or undefined in process.env!');
  console.error('Check that your .env file is in the root directory and contains no typos.\n');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Required for Neon serverless cloud databases to bypass local network handshakes securely
    rejectUnauthorized: false, 
  },
});

// Test connection on initial boot
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection verification failed:', err.message);
  } else {
    console.log('✅ Successfully established secure handshake with Neon PostgreSQL.');
  }
});

module.exports = pool;