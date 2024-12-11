import { JsonWebTokenError } from 'jsonwebtoken';
import VerificationCodeType from '../constants/verificationCodeType';
import SessionModel from '../models/session.model';
import UserModel from '../models/user.model';
import VerificationCodeModel from '../models/verificationCode.model';
import { oneYearFromNow } from '../utils/date';
import jwt from 'jsonwebtoken';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import CustomError from '../utils/customError';

type createAccoutParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: createAccoutParams) => {
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

  // console.log(user);

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
