import prisma from '../../prisma';
import { User } from '@prisma/client'

export const findUserByEmail = async (email: string = '**-**'): Promise<Partial<User> | null> => {
  return prisma.user.findFirst({
    where: {
      email,
    },
    select: { id: true, name: true, email: true, createdAt: true },
  });
}

export const findUserByEmailWPass = async (email: string = '**-**'): Promise<Partial<User> | null> => {
  return prisma.user.findFirst({
    where: {
      email,
    },
    select: { id: true, name: true, email: true, createdAt: true, password: true, },
  });
}

export const findUserById = async (id: number = 0): Promise<Partial<User> | null> => {
  return prisma.user.findFirst({
    where: {
      id,
    },
    select: { id: true, name: true, email: true, createdAt: true },
  });
}

export const createUser = (user: {
  name: string,
  email: string,
  password: string,
}): Promise<Partial<User> | null> => {
  return prisma.user.create({
    data: {
      ...user,
    },
    select: { id: true, name: true, email: true, createdAt: true },
  });
}