import prisma from '../../prisma';

// Create a new category
export const createCategoryRecord = (name: string) =>
  prisma.category.create({ data: { name } });

// Find a category by its name
export const findCategoryByName = (name: string) =>
  prisma.category.findFirst({ where: { name } });

// Update a category by ID
export const updateCategoryRecord = (id: number, name: string) =>
  prisma.category.update({ where: { id }, data: { name } });

// Delete a category by ID
export const deleteCategoryRecord = (id: number) =>
  prisma.category.delete({ where: { id } }).then(() => {});

// Retrieve all categories
export const readAllCategoriesRecord = () => prisma.category.findMany();

// Retrieve a single category by ID
export const readCategoryRecord = (id: number) =>
  prisma.category.findUnique({ where: { id } });