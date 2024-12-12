import { NextFunction, Request, Response } from 'express';
import * as services from '../services/auth.service';
import {
  clearAuthenticationCookies,
  setAuthenticationCookies,
} from '../utils/cookies';
import { loginSchema, registerSchema } from '../validations/schemas';
import { verifyToken } from '../utils/jwt';
import SessionModel from '../models/session.model';

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
      .json(user);
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = loginSchema.parse({
      ...req.body,
      userAgent: req.headers['user-agent'],
    });

    const { user, refreshToken, accessToken } = await services.loginUser(
      request
    );

    setAuthenticationCookies({ res, accessToken, refreshToken })
      .status(200)
      .json({
        message: 'Login succesfull',
      });
  } catch (error) {
    next(error);
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate request
    const accessToken = req.cookies.accessToken;
    const { payload } = verifyToken(accessToken);

    // delete session
    if (payload) {
      await SessionModel.destroy({
        where: {
          id: payload.sessionId,
        },
      });
    }

    // clear cookies
    clearAuthenticationCookies(res).status(200).json({
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
};
