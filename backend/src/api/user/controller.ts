import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRequest from '../../interfaces/UserRequest';

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      next(new Error('User already exists'));
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    res.status(200).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser.id),
    });
  } catch (error) {
    next(new Error('Failed to register user'));
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      next(new Error('Invalid email or password!'));
      return;
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      next(new Error('Invalid email or password!'));
      return;
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    next(new Error('Failed to login'));
  }
};

// Get user profile
export const getUserProfile = async (req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) {
      next(new Error('User not found'));
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};