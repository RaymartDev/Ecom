import { NextFunction, Request, Response } from 'express';
import ErrorResponse from './interfaces/ErrorResponse';
import jwt from 'jsonwebtoken';
import DecodedToken from './interfaces/DecodedToken';
import UserRequest from './interfaces/UserRequest';
import { findUserById } from './api/user/service';

export const isAuthenticated = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        next(new Error('Not authorized, no token'));
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as DecodedToken;

        req.user = await findUserById(decoded.id);

        if (!req.user) {
            next(new Error('Not authorized, user not found'));
            return;
        }
        next();
    } catch (error) {
        next(new Error('Not authorized, token failed'));
    }
};

export const isAdmin = (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user?.isAdmin) {
        next(new Error("Admin access required"));
        return;
    }
    next();
};

export function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
}