const pool = require('../config/db');

exports.getAllProducts = async (req, res) => {
  try {
    const queryText = `
      SELECT p.product_name, v.grade_name, t.pack_size_kg, t.total_pack_price 
      FROM products p
      JOIN product_variants v ON p.product_id = v.product_id
      JOIN variant_pricing_tiers t ON v.variant_id = t.variant_id
    `;
    const result = await pool.query(queryText);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection error' });
  }
};