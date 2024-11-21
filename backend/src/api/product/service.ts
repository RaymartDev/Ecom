import prisma from '../../prisma';
import { Product} from '@prisma/client';

export const createProductRecord = (product: {
  name: string,
  description: string,
  price: number,
  stock: number,
  categoryId: number,
}): Promise<Product> => {
  return prisma.product.create({
    data: {
      ...product,
    },
  })
}

export const updateProductRecord= (id: number = 0,product: Partial<{
  name: string,
  description: string,
  price: number,
  stock: number,
  categoryId: number,
}>): Promise<Product> => {
  return prisma.product.update({
    where: { id, },
    data: { ...product, },
  })
}

export const deleteProductRecord = async (id: number = 0): Promise<void> => {
  prisma.product.delete({
    where: { id, },
  })
}