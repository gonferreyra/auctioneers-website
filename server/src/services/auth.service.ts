import { JsonWebTokenError } from 'jsonwebtoken';
import VerificationCodeType from '../constants/verificationCodeType';
import SessionModel from '../models/session.model';
import UserModel from '../models/user.model';
import VerificationCodeModel from '../models/verificationCode.model';
import { oneYearFromNow } from '../utils/date';
import jwt from 'jsonwebtoken';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import CustomError from '../utils/customError';
import { compareValue } from '../utils/bcrypt';

type CreateAccoutParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccoutParams) => {
  // verify existing user
  const existingUser = await UserModel.findOne({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new CustomError(409, 'Email already in use');
  }

  // create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: user.id!,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });
  // send verification email
  // create session
  const session = await SessionModel.create({
    userId: user.id!,
    userAgent: data.userAgent,
  });

  // sign access token & refresh token
  const refreshToken = jwt.sign({ sessionId: session.id }, JWT_REFRESH_SECRET, {
    audience: ['user'],
    expiresIn: '30d',
  });

  const accessToken = jwt.sign(
    { userId: user.id, sessionId: session.id },
    JWT_SECRET,
    {
      audience: ['user'],
      expiresIn: '15m',
    }
  );

  // return user & tokens
  return {
    user,
    accessToken,
    refreshToken,
  };
};

type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  // get user by email
  const user = await UserModel.scope('withPassword').findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new CustomError(404, 'Invalid email');
  }

  // validate password
  const isPasswordValid = await compareValue(password, user.password);
  if (!isPasswordValid) {
    throw new CustomError(401, 'Invalid password');
  }

  // create a session
  const session = await SessionModel.create({
    userId: user.id!,
    userAgent,
  });

  // sign access token & refresh token
  const refreshToken = jwt.sign(
    {
      sessionId: session.id,
    },
    JWT_REFRESH_SECRET,
    {
      audience: ['user'],
      expiresIn: '30d',
    }
  );

  const accessToken = jwt.sign(
    {
      sessionId: session.id,
      userId: user.id,
    },
    JWT_SECRET,
    {
      audience: ['user'],
      expiresIn: '15m',
    }
  );

  return {
    user,
    refreshToken,
    accessToken,
  };
};
