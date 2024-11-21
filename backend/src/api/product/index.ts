import express from 'express';
import { isAuthenticated } from '../../middlewares';
import { createProduct, deleteProduct, updateProduct } from './controller';

const router = express.Router();

router.post('/', isAuthenticated, createProduct);
router.put('/:id', isAuthenticated, updateProduct);
router.delete('/:id', isAuthenticated, deleteProduct);

export default router;