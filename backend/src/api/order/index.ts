import express from 'express';
import { isAdmin, isAuthenticated } from '../../middlewares';
import { createOrder, deleteOrder, getAllOrders, getUserOrders, updateOrderStatus } from './controller';

const router = express.Router();

router.post('/', isAuthenticated, createOrder);
router.get('/', isAuthenticated, isAdmin, getAllOrders);
router.get('/my-orders', isAuthenticated, getUserOrders);
router.put('/:id/status', isAuthenticated, isAdmin, updateOrderStatus);
router.delete('/:id', isAuthenticated, isAdmin, deleteOrder);

export default router;