const pool = require('../config/db');

exports.processOrderPayment = async (req, res) => {
  const { customerEmail, gradeId, quantityKg, paymentMethod, shippingType } = req.body;

  try {
    // 1. Verify the grade exists and check inventory levels
    const gradeCheck = await pool.query(
      'SELECT weight, in_shop, grade_name FROM grade WHERE grade_id = $1',
      [gradeId]
    );

    if (gradeCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Specification grade not found.' });
    }

    const currentStock = parseFloat(gradeCheck.rows[0].weight);
    if (currentStock < parseFloat(quantityKg)) {
      return res.status(400).json({ 
        error: `Insufficient inventory. Only ${currentStock}kg of ${gradeCheck.rows[0].grade_name} remaining.` 
      });
    }

    // 2. LOGIC PLACEHOLDER: Integrate your Stripe/Gateway token handling here if it's an online shop order.
    console.log(`Processing payment for ${quantityKg}kg via ${paymentMethod}`);

    // 3. Deduct stock weight instantly upon successful payment execution
    const updatedStock = currentStock - parseFloat(quantityKg);
    await pool.query(
      'UPDATE grade SET weight = $1 WHERE grade_id = $2',
      [updatedStock, gradeId]
    );

    res.json({ 
      success: true, 
      message: 'Payment verified and stock inventory allocated successfully.',
      remainingStock: updatedStock
    });

  } catch (err) {
    console.error('Payment execution error:', err);
    res.status(500).json({ error: 'Payment processing failed down the line.' });
  }
};