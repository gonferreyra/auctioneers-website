import { NextFunction, Request, Response } from 'express';
import * as services from '../services/auth.service';
import {
  clearAuthenticationCookies,
  setAuthenticationCookies,
} from '../utils/cookies';
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationCodeSchema,
} from '../validations/schemas';
import { verifyToken } from '../utils/jwt';
import SessionModel from '../models/session.model';
import CustomError from '../utils/customError';
import {
  fifteenMinutesFromNow,
  thirtyDaysFromNow,
  twoHoursFromNow,
} from '../utils/date';

const secure = process.env.NODE_ENV === 'production';

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
        user,
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
    const accessToken = req.cookies.accessToken as string | undefined;
    const { payload } = verifyToken(accessToken || '');

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

export const refreshHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate request
    const refreshToken = req.cookies.refreshToken;
    console.log('Received refresh token:', refreshToken);

    if (!refreshToken) {
      throw new CustomError(401, 'Missing refresh token');
    }

    // call service
    const { accessToken, newRefreshToken } =
      await services.refreshUserAccessToken(refreshToken);

    if (newRefreshToken) {
      res.cookie('refreshToken', newRefreshToken, {
        sameSite: 'strict',
        httpOnly: true,
        secure,
        expires: thirtyDaysFromNow(),
        path: '/auth/refresh',
      });
    }

    res
      .status(200)
      .cookie('accessToken', accessToken, {
        sameSite: 'strict',
        httpOnly: true,
        secure,
        expires: twoHoursFromNow(),
      })
      .json({
        message: 'Access token refreshed',
      });
  } catch (error) {
    next(error);
  }
};

export const verifyEmailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verificationCode = verificationCodeSchema.parse(req.params.code);

    await services.verifyEmail(verificationCode);

    res.status(200).json({
      message: 'Email verified',
    });
  } catch (error) {
    next(error);
  }
};

export const sendPasswordResetHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = emailSchema.parse(req.body.email);

    await services.sendPasswordResetEmail(request);

    clearAuthenticationCookies(res).status(200).json({
      message: 'Password reset email sent',
    });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = resetPasswordSchema.parse(req.body);

    await services.resetPassword(request);

    clearAuthenticationCookies(res).status(200).json({
      message: 'Password reset successful',
    });
  } catch (error) {
    next(error);
  }
};
