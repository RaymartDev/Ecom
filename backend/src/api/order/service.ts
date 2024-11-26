import prisma from '../../prisma';

export const createOrderRecord = async (userId: number = 0) => {
  const cartItems = await prisma.shoppingCart.findMany({
    where: {
      userId,
    },
    include: { product: true },
  });

  if (cartItems.length === 0) {
    return null;
  }

  // Check for stock availability
  for (const item of cartItems) {
    if (item.product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${item.product.name}`);
    }
  }

  const order = prisma.order.create({
    data: {
      userId,
      orderItems: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
    include: { orderItems: true },
  });

  // Deduct stock for each product
  for (const item of cartItems) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  // Clear the shopping cart
  await prisma.shoppingCart.deleteMany({
    where: { userId },
  });

  return order;
}


export const getUserOrderRecord = (userId: number = 0) => {
  return prisma.order.findMany({
    where: { userId },
    include: { orderItems: { include: { product: true } } },
  });
}

export const updateOrderRecord = (id: number = 0, status: string = '**-**') => {
  return prisma.order.update({
    where: { id },
    data: { status },
  });
}

/**
 * ADMIN FEATURES
  */
export const getAllOrdersRecord = (status: string = '**-**') => {
  return prisma.order.findMany({
    where: { status: String(status) },
    include: { orderItems: { include: { product: true } }, user: true },
  });
}

export const deleteOrderRecord = (id: number = 0) => {
  return prisma.order.delete({
    where: { id },
  }).then(() => {});
}