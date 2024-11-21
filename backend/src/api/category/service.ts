import { Category } from '@prisma/client';
import prisma from '../../prisma';

export const createCategoryRecord = (name: string):Promise<Category> => {
  return prisma.category.create({
    data: {
      name,
    }
  })
}

export const findCategoryByName = (name: string):Promise<Category | null> => {
  return prisma.category.findFirst({
    where: {
      name,
    },
  })
}

export const updateCategoryRecord = (id: number = 0, name: string): Promise<Category> => {
  return prisma.category.update({
    where: { id, },
    data: { name },
  })
}

export const deleteCategoryRecord = async (id: number = 0): Promise<void> => {
  await prisma.category.delete({
    where: {
      id,
    }
  })
}