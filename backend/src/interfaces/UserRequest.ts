import { Request } from 'express';
import { User } from '@prisma/client'

export default interface UserRequest extends Request {
  user?: Partial<User> | null;
}