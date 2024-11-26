import { NextFunction, Response } from 'express';
import UserRequest from '../../interfaces/UserRequest';
import {
  addItemToCartRecord, clearCartRecord,
  getMyCartRecord,
  removeItemFromCartRecord,
  updateQuantityFromCartRecord
} from './service';

export const getMyCart = async(req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id;

  try {
    const cartItems = await getMyCartRecord(userId);

    res.status(200).json(cartItems);
  } catch (error) {
    next(error);
  }
}

export const addItemToCart = async (req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  const { productId, quantity } = req.body;
  try {
    const newCartItem = await addItemToCartRecord(userId, Number(productId), Number(quantity));
    res.status(200).json(newCartItem);
  } catch (error) {
    next(error);
  }
}

export const updateQuantityFromCart = async (req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCartItem = await updateQuantityFromCartRecord(userId, Number(productId), Number(quantity));
    res.status(201).json(updatedCartItem);
  } catch (error) {
    next(error);
  }
}

export const removeItemFromCart = async (req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  const { productId } = req.params;

  try {
    await removeItemFromCartRecord(userId, Number(productId));

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export const clearCart = async(req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id;

  try {
    await clearCartRecord(userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}