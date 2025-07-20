import express from 'express';
import {
  getProducts,
  addProduct,
  updateProduct,
  removeProduct,
  featuredProducts,
  cartedProducts
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', featuredProducts);
router.get('/carted', cartedProducts);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.put('/remove/:id', removeProduct);

export default router;