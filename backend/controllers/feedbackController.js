import pool from '../models/db.js';

export const getFeedBack = async (req, res) => {
    try {
        const feedback = await pool.query("SELECT * FROM feedback ORDER BY id DESC", []);
        res.json({ success: true, feedback: feedback.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};

export const InsertFeedBack = async (req, res) => {
    const { name, rating, quote } = req.body;

    try {
        await pool.query("INSERT INTO feedback (name, rating, quote) VALUES ($1, $2, $3)", [name, rating, quote]);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};