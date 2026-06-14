const { Pool } = require('pg');
require('dotenv').config(); // Fallback to look at root .env

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;