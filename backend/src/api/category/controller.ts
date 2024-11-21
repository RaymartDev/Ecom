import UserRequest from '../../interfaces/UserRequest';
import { NextFunction, Response } from 'express';
import { createCategoryRecord, deleteCategoryRecord, findCategoryByName, updateCategoryRecord } from './service';

export const createCategory = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name) {
    next(new Error('Name is required'));
    return;
  }

  try {
    const category = await createCategoryRecord(name);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// Delete a category
export const deleteCategory = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    await deleteCategoryRecord(Number(id));
    res.status(204).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// Update a category
export const updateCategory = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    next(new Error('Name is required'));
    return;
  }

  try {
    const findCategory = await findCategoryByName(name);

    if (findCategory) {
      next(new Error('Category name already exists'));
      return;
    }

    const updatedCategory = await updateCategoryRecord(Number(id), name);

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

// TODO: READ ONE, ALL, AND SEARCH