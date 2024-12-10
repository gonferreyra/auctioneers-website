import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as services from '../services/auth.service';
import { setAuthenticationCookies } from '../utils/cookies';

const registerSchema = z
  .object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate request
    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers['user-agent'],
    });
    // call service
    const { user, accessToken, refreshToken } = await services.createAccount(
      request
    );
    // response
    setAuthenticationCookies({ res, accessToken, refreshToken })
      .status(201)
      .json({
        user,
      });
    // res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
