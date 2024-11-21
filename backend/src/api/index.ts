import express from 'express';
import user from './user';
import category from './category';
import product from './product';

const router = express.Router();

router.get('', async (_req: express.Request, res: express.Response) => {
  res.status(200).json({ message: 'Welcome to ECom!' });
})

router.use('/user', user);
router.use('/category', category);
router.use('/product', product);

export default router;