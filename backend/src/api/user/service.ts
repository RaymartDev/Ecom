import prisma from '../../prisma';

// Common fields to select for user queries
const userSelectFields = { id: true, name: true, email: true, createdAt: true };
const userSelectFieldsWithPassword = { ...userSelectFields, password: true };

// Find a user by email (without password)
export const findUserByEmail = (email: string) =>
  prisma.user.findFirst({
    where: { email },
    select: userSelectFields,
  });

// Find a user by email (with password)
export const findUserByEmailWPass = (email: string) =>
  prisma.user.findFirst({
    where: { email },
    select: userSelectFieldsWithPassword,
  });

// Find a user by ID
export const findUserById = (id: number) =>
  prisma.user.findFirst({
    where: { id },
    select: userSelectFields,
  });

// Create a new user
export const createUser = (user: {
  name: string;
  email: string;
  password: string;
}) =>
  prisma.user.create({
    data: user,
    select: userSelectFields,
  });