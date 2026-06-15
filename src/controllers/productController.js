const pool = require('../config/db');

exports.getAllProducts = async (req, res) => {
  console.log("DEBUG DATABASE URL:", process.env.DATABASE_URL);
  try {
    
    const queryText = `
      SELECT 
    i.item_id AS id,
    p.product_name,
    v.variant_name,
    g.grade_name,
    i.specification,
    i.unit_type, -- Pulling 'kg' or 'pcs'
    i.price_per_unit,
    i.in_shop,
    COALESCE(
        json_balance.tiers, 
        json_build_array(json_build_object('min_qty', 1.00, 'price', i.price_per_unit))
    ) AS price_tiers
FROM inventory_items i
JOIN grades g ON i.grade_id = g.grade_id
JOIN variants v ON g.variant_id = v.variant_id
JOIN products p ON v.product_id = p.product_id
LEFT JOIN (
    SELECT item_id, json_agg(json_build_object('min_qty', minimum_quantity, 'price', price_per_unit) ORDER BY minimum_quantity ASC) AS tiers
    FROM price_tiers
    GROUP BY item_id
) json_balance ON i.item_id = json_balance.item_id
WHERE i.in_shop = TRUE AND i.current_stock > 0;
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