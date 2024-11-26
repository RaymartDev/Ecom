import express from 'express';
import { isAuthenticated } from '../../middlewares';
import { addItemToCart, clearCart, getMyCart, removeItemFromCart, updateQuantityFromCart } from './controller';

const router = express.Router();

router.get('/', isAuthenticated, getMyCart);
router.post('/', isAuthenticated, addItemToCart);
router.put('/:id', isAuthenticated, updateQuantityFromCart);
router.delete('/:id', isAuthenticated, removeItemFromCart);
router.delete('/', isAuthenticated, clearCart);

export default router;