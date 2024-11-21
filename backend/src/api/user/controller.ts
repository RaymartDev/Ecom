import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRequest from '../../interfaces/UserRequest';
import { createUser, findUserByEmail, findUserByEmailWPass, findUserById } from './service';

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      next(new Error('User already exists'));
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      res.status(200).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser.id || 0),
      });
    } else {
      next(new Error('Something went wrong!'));
    }
  } catch (error) {
    next(new Error('Failed to register user'));
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await findUserByEmailWPass(email);
    if (!user) {
      next(new Error('Invalid email or password!'));
      return;
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) {
      next(new Error('Invalid email or password!'));
      return;
    }

    if (user) {
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id || 0),
      });
    } else {
      next(new Error('Something went wrong!'));
    }
  } catch (error) {
    next(new Error('Failed to login'));
  }
};

// Get user profile
export const getUserProfile = async (req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id;

  try {
    const user = await findUserById(userId || 0);

    if (!user) {
      next(new Error('User not found'));
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};