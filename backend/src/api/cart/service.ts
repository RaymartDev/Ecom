import prisma from '../../prisma';

export const getMyCartRecord = (userId: number = 0) => {
  return prisma.shoppingCart.findMany({
    where: { userId }
  })
}

export const addItemToCartRecord = async (userId: number = 0, productId: number = 0, quantity: number = 1) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  // Check if the item is already in the cart
  const existingCartItem = await prisma.shoppingCart.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existingCartItem) {
    // Update the quantity of the existing item
    return prisma.shoppingCart.update({
      where: { userId_productId: { userId, productId } },
      data: { quantity: existingCartItem.quantity + quantity },
    });
  }

  return prisma.shoppingCart.create({
    data: { userId, productId, quantity },
  });
}

export const updateQuantityFromCartRecord =  (userId: number = 0, productId: number = 0, quantity = 0) => {
  return prisma.shoppingCart.update({
    where: { userId_productId: { userId, productId } },
    data: { quantity },
  });
}

export const removeItemFromCartRecord = (userId: number = 0, productId: number = 0) => {
  return prisma.shoppingCart.delete({
    where: { userId_productId: { userId, productId } },
  });
}

export const clearCartRecord = (userId: number = 0) => {
  return prisma.shoppingCart.deleteMany({
    where: { userId },
  });
}