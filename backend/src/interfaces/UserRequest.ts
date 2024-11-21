import { Request } from 'express';
import DecodedToken from './DecodedToken';

export default interface UserRequest extends Request {
  user?: DecodedToken | null;
}