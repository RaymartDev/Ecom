import express from 'express';
import { getUserProfile, loginUser, registerUser } from './controller';
import { isAuthenticated } from '../../middlewares';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile',  isAuthenticated, getUserProfile);

export default router;