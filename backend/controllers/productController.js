import cloudinary from '../models/cloudinary.js';
import pool from '../models/db.js';

// GET all products
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jerseys ORDER BY id DESC');
    const products = result.rows
    res.json({ success: true, products });
  } catch (error) {
    console.error('Error from getProducts function', error.message)
    res.status(500).json({ success: false })
  }
};

// GET specific product
export const selectItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id])
    const item = result.rows[0]
    res.json({ success: true, item })
  } catch (error) {
    res.status(500).json({ success: false })
  }
};

// GET Carted items
export const cartedProducts = async (req, res) => {
  const idsParam = req.query.ids;

  if (!idsParam) {
    return res.status(400).json({ success: false, error: 'Missing ids parameter' });
  }

  const ids = idsParam.split(',').map((id) => parseInt(id)).filter(Boolean);

  if (ids.length === 0) {
    return res.status(400).json({ success: false, error: 'Invalid ids format' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT * FROM jerseys WHERE id = ANY($1::int[])',
      [ids]
    );

    res.json({ success: true, jersey: rows });
  } catch (err) {
    console.error('Error fetching jerseys by ids:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  };
};

// GET featured products
export const featuredProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jerseys ORDER BY id DESC LIMIT 3');
    const products = result.rows;
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({ success: false });
  };
};

// POST add new products
export const addProduct = async (req, res) => {
  const { jerseys } = req.body;

  if (!Array.isArray(jerseys) || jerseys.length === 0) {
    return res.status(400).json({ message: 'Invalid jersey data' });
  }

  const values = [];
  const placeholders = jerseys.map((j, i) => {
    const idx = i * 5;
    values.push(j.club, j.season, j.price, j.available, j.image_url);
    return `($${idx + 1}, $${idx + 2}, $${idx + 3}, $${idx + 4}, $${idx + 5})`;
  }).join(", ");

  const query = `
    INSERT INTO jerseys (club, season, price, available, image_url)
    VALUES ${placeholders}
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, values);
    res.status(201).json({ success: true, inserted: result.rows });
  } catch (err) {
    console.error("Bulk insert error:", err);
    res.status(500).json({ error: "Failed to insert jerseys" });
  }
};

// PUT edit product
export const updateProduct = async (req, res) => {
  try {
    const { club, season, price, available, image_url } = req.body;
    const { id } = req.params;

    const query = 'UPDATE jerseys SET club = $1, season = $2, price = $3, available = $4, image_url = $5 WHERE id = $6'

    const values = [club, season, price, available, image_url, id];

    await pool.query(query, values);
    res.json({ success: true, message: 'Product updated' });
  } catch (err) {
    console.error('Error from updateProduct function', err.message)
    res.status(500).json({ error: 'Update failed', success: false });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM jerseys WHERE id = $1', [id]);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    console.error('Error from deleteProduct function', err.message)
    res.status(500).json({ error: 'Delete failed', success: false });
  }
};