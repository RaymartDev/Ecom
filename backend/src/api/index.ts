import express from 'express';
import user from './user';
import category from './category';
import product from './product';
import order from './order';
import cart from './cart';

const router = express.Router();

router.get('', async (_req: express.Request, res: express.Response) => {
  res.status(200).json({ message: 'Welcome to ECom!' });
})

router.use('/user', user);
router.use('/category', category);
router.use('/product', product);
router.use('/order', order);
router.use('/cart', cart);

export default router;