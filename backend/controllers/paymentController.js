import axios from 'axios';
import pool from '../models/db.js';

export const pay = async (req, res) => {
  const tx_ref = `mira-${Date.now()}`;
  const { price, name, phone, address, cart } = req.body;

  const payload = {
    tx_ref,
    callback_url: `${process.env.BACKEND_URL}/callback`,
    return_url: `${process.env.FRONTEND_URL}/verify/${tx_ref}`,
    amount: price,
    currency: "ETB",
    meta: {
      name,
      phone,
      address,
      cart,
      price,
    },
    customization: {
      title: "Mira Jersey",
      description: "Orginal Jersey Payment",
    },
  };

  try {
    const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', payload, {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_API_SECRET}`,
      },
    });

    const payUrl = response.data.data.checkout_url;
    res.json({ success: true, checkout_url: payUrl });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false });
  }
};


export const verify = async (req, res) => {
  const { tx_ref } = req.params;

  try {
    // 1. Avoid duplicate orders
    const existingOrder = await pool.query(
      'SELECT * FROM orders WHERE chapa_tx_ref = $1',
      [tx_ref]
    );

    if (existingOrder.rowCount > 0) {
      return res.json({ status: 'exists', type: existingOrder.rows[0].status });
    }

    // 2. Verify with Chapa
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_API_SECRET}`,
        },
      }
    );

    if (response.data.status !== 'success') {
      return res.json({ status: 'failed' });
    }

    // 3. Extract meta from Chapa
    const meta = response.data.data.meta;
    const { name, phone, address, price, cart } = meta;

    // 4. Start transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 5. Insert into orders table
      const orderRes = await client.query(
        `INSERT INTO orders (customer_name, phone, address, total_amount, chapa_tx_ref)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [name, phone, address, price, tx_ref]
      );
      const orderId = orderRes.rows[0].id;

      // 6. Insert order items & update inventory
      for (const item of cart) {
        const { id, quantity } = item;

        // Deduct quantity
        await client.query(
          'UPDATE jerseys SET available = available - $1 WHERE id = $2',
          [quantity, id]
        );


        // Insert into order_items
        await client.query(
          `INSERT INTO order_items (order_id, jersey_id, quantity)
           VALUES ($1, $2, $3)`,
          [orderId, id, quantity]
        );
      }

      await client.query('COMMIT');
      client.release();
      res.json({ status: 'success' });

    } catch (err) {
      await client.query('ROLLBACK');
      client.release();
      console.error("Transaction failed:", err.message);
      res.status(500).json({ status: 'error', error: err.message });
    }

  } catch (error) {
    console.error('Verification error:', error.response?.data || error.message);
    res.status(500).json({ status: 'error' });
  }
};