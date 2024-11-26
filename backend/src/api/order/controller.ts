import { Response, NextFunction } from 'express';
import UserRequest from '../../interfaces/UserRequest';
import {
  createOrderRecord,
  deleteOrderRecord,
  getAllOrdersRecord,
  getUserOrderRecord,
  updateOrderRecord
} from './service';

export const createOrder = async (req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id;

  try {
    const order = await createOrderRecord((userId));

    if (!order) {
      next(new Error('Shopping cart is empty'));
      return;
    }

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

export const getAllOrders = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { status } = req.query;

  try {
    const order = await getAllOrdersRecord(String(status));

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export const getUserOrders = async (req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id;

  try {
    const order = await getUserOrderRecord(userId);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export const updateOrderStatus = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await updateOrderRecord(Number(id), status);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export const deleteOrder = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    await deleteOrderRecord(Number(id));

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}