import express from 'express';
import { getOrders, updateOrderStatus } from '../controllers/orderController.js'

const router = express.Router();

router.get('/:status', getOrders)
router.put('/:orderId', updateOrderStatus)

export default router;