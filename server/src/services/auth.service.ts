import VerificationCodeType from '../constants/verificationCodeType';
import SessionModel from '../models/session.model';
import UserModel from '../models/user.model';
import VerificationCodeModel from '../models/verificationCode.model';
import { ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow } from '../utils/date';
import CustomError from '../utils/customError';
import { compareValue } from '../utils/bcrypt';
import {
  accessTokenSignOptions,
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from '../utils/jwt';

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

  if (user.id === undefined || session.id === undefined) {
    throw new Error('Error creating user or session');
  }

  // sign access token & refresh token
  const refreshToken = signToken(
    { sessionId: session.id },
    refreshTokenSignOptions
  );

  const accessToken = signToken(
    { userId: user.id, sessionId: session.id },
    accessTokenSignOptions
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

  if (user.id === undefined || session.id === undefined) {
    throw new Error('Error creating user or session');
  }

  const refreshToken = signToken(
    { sessionId: session.id },
    refreshTokenSignOptions
  );

  const accessToken = signToken(
    { sessionId: session.id, userId: user.id },
    accessTokenSignOptions
  );

  return {
    user,
    refreshToken,
    accessToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  // validate token - get sessionId from payload
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });

  if (!payload) {
    throw new CustomError(401, 'Invalid refresh token');
  }

  // validate session is not expired
  const session = await SessionModel.findByPk(payload.sessionId);

  if (!session) {
    throw new CustomError(401, 'Session not found');
  }

  if (
    session?.expiresAt !== undefined &&
    session.expiresAt.getTime() < Date.now()
  ) {
    throw new CustomError(401, 'Session expired');
  }

  // refresh the session if it expires in the next 24 hours
  const sessionNeedsRefresh = session?.expiresAt
    ? session.expiresAt.getTime() - Date.now() <= ONE_DAY_MS
    : false;

  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }

  // sign new tokens
  const newRefreshToken = sessionNeedsRefresh
    ? signToken(
        {
          sessionId: session.id!,
        },
        refreshTokenSignOptions
      )
    : undefined;

  const accessToken = signToken({
    sessionId: session.id!,
    userId: session.userId,
  });

  return {
    accessToken,
    newRefreshToken,
  };
};
