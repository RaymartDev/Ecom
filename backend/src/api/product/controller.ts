import UserRequest from '../../interfaces/UserRequest';
import { NextFunction, Response } from 'express';
import { createProductRecord, deleteProductRecord, updateProductRecord } from './service';

export const createProduct = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { name, description, price, stock, categoryId } = req.body;

  if (!name || !description || price === undefined || stock === undefined || !categoryId) {
    next(new Error('All fields are required'));
    return;
  }

  try {
    const product = await createProductRecord({ name, description, price, stock, categoryId });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

export const deleteProduct = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    await deleteProductRecord(Number(id));
    res.status(204).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, description, price, stock, categoryId } = req.body;
  const updateData: { name?: string; description?: string; price?: number; stock?: number; categoryId?: number } = {};

// Conditionally add fields only if they're provided
  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (price !== undefined) updateData.price = price;
  if (stock !== undefined) updateData.stock = stock;
  if (categoryId !== undefined) updateData.categoryId = categoryId;
  try {
    const product = await updateProductRecord(Number(id), updateData);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// TODO: READ ONE, ALL, AND SEARCH