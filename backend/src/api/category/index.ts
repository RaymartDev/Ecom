import express from 'express';
import { isAuthenticated } from '../../middlewares';
import { createCategory, deleteCategory, readAllCategories, readCategory, updateCategory } from './controller';

const router = express.Router();

router.post('/', isAuthenticated, createCategory);
router.put('/:id', isAuthenticated, updateCategory);
router.delete('/:id', isAuthenticated, deleteCategory);
router.get('/all', isAuthenticated, readAllCategories);
router.get('/find/:id', isAuthenticated, readCategory);

export default router;