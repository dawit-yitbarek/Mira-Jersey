import pool from '../models/db.js';


export const getOrders = async (req, res) => {

  const { status } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        o.id AS order_id,
        o.customer_name,
        o.phone,
        o.address,
        o.total_amount,
        o.payment_status,
        o.created_at,
        oi.quantity,
        j.id AS jersey_id,
        j.club AS jersey_name,
        j.image_url,
        j.season,
        j.price AS jersey_price
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN jerseys j ON oi.jersey_id = j.id
      WHERE o.payment_status = $1
      ORDER BY o.created_at ASC
    `, [status]);

    const orders = {};

    result.rows.forEach(row => {
      const orderId = row.order_id;
      if (!orders[orderId]) {
        orders[orderId] = {
          order_id: orderId,
          customer_name: row.customer_name,
          phone: row.phone,
          address: row.address,
          total_amount: row.total_amount,
          status: row.payment_status,
          created_at: row.created_at,
          items: [],
        };
      }

      orders[orderId].items.push({
        jersey_id: row.jersey_id,
        jersey_name: row.jersey_name,
        image: row.image_url,
        season: row.season,
        jersey_price: row.jersey_price,
        quantity: row.quantity,
      });
    });

    res.json(Object.values(orders));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};


export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    await pool.query("UPDATE orders SET payment_status = $1 WHERE id = $2", ['delivered', orderId]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};