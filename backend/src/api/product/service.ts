import prisma from '../../prisma';

// Create a new product
export const createProductRecord = (product: {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  brandId: number;
}) =>
  prisma.product.create({ data: product });

// Update an existing product
export const updateProductRecord = (id: number, product: Partial<{
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  brandId: number;
}>) =>
  prisma.product.update({ where: { id }, data: product });

// Delete a product by ID
export const deleteProductRecord = (id: number) =>
  prisma.product.delete({ where: { id } }).then(() => {});