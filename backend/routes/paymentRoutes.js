import express from 'express';
import { pay } from '../controllers/paymentController.js';
import { verify } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/initiate', pay);
router.get('/verify/:tx_ref', verify);

export default router;