import express from 'express';
import { isAuthenticated } from '../../middlewares';
import { createCategory, deleteCategory, updateCategory } from './controller';

const router = express.Router();

router.post('/', isAuthenticated, createCategory);
router.put('/:id', isAuthenticated, updateCategory);
router.delete('/:id', isAuthenticated, deleteCategory);

export default router;