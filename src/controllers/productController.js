const pool = require('../config/db');

exports.getAllProducts = async (req, res) => {
  console.log("DEBUG DATABASE URL:", process.env.DATABASE_URL);
  try {
    
    const queryText = `
      SELECT 
        p.product_id,
        p.product_name, 
        v.variant_name, -- 'Sticks' or 'Powder'
        g.grade_id,
        g.grade_name,   -- 'C5 Premium', 'Alba', etc.
        g.specification, -- '5 inches', '60 Mesh', or NULL
        g.weight,       -- Current physical weight in KG
        g.in_shop       -- TRUE = Online Shop, FALSE = Wholesale Only
      FROM product p
      LEFT JOIN variant v ON p.product_id = v.product_id
      LEFT JOIN grade g ON v.variant_id = g.variant_id
      ORDER BY p.product_name, v.variant_name, g.grade_name;
    `;

    const result = await pool.query(queryText);
    res.json(result.rows);
    // Add this temporary line directly inside your getAllProducts function:
console.log("🔍 CONTROLLER POOL OPTION:", pool.options ? pool.options.connectionString : "No explicit connection string found on pool object");
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error while fetching inventory' });
  }
};