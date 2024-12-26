import VerificationCodeType from '../constants/verificationCodeType';
import SessionModel from '../models/session.model';
import UserModel from '../models/user.model';
import VerificationCodeModel from '../models/verificationCode.model';
import { ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow } from '../utils/date';
import CustomError from '../utils/customError';
import { compareValue, hashValue } from '../utils/bcrypt';
import {
  accessTokenSignOptions,
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from '../utils/jwt';
import { Op } from 'sequelize';
import { sendMail } from '../utils/sendMail';
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from '../utils/emailTemplates';
import { APP_ORIGIN } from '../constants/env';

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

  const url = `${APP_ORIGIN}/email/verify/${verificationCode.id}`;

  // send verification email
  const { error } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });

  if (error) {
    console.log(error);
  }

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

export const verifyEmail = async (verificationCode: string) => {
  // get verification code
  const validCode = await VerificationCodeModel.findOne({
    where: {
      id: verificationCode,
      type: VerificationCodeType.EmailVerification,
      expiresAt: {
        // grater or equal to current time
        [Op.gte]: Date.now(),
      },
    },
  });

  if (!validCode) {
    throw new CustomError(404, 'Invalid verification code');
  }

  // update user to verified true
  const updatedUser = await UserModel.update(
    {
      verified: true,
    },
    {
      where: {
        id: validCode.userId,
      },
    }
  );

  if (!updatedUser) {
    throw new CustomError(500, 'Failed to verify email');
  }

  //delete verification code
  await validCode.destroy();

  // return user
  return {
    user: updatedUser,
  };
};

export const sendPasswordResetEmail = async (email: string) => {
  // get user by email
  const user = await UserModel.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new CustomError(404, 'User not found');
  }

  // check email rate limit - don't allow more than 1 requests in 5 minutes
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const count = await VerificationCodeModel.findAndCountAll({
    where: {
      type: 'password-reset',
      userId: user.id,
      createdAt: {
        [Op.gte]: fiveMinutesAgo,
      },
    },
  });

  if (count.count >= 1) {
    throw new CustomError(429, 'Too many password reset requests');
  }

  // create verification code
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  const verificationCode = await VerificationCodeModel.create({
    userId: user.id!,
    type: VerificationCodeType.PasswordReset,
    expiresAt,
  });

  // send verification email with code and expiresAt. If it's expired, the code will be invalid
  const url = `${APP_ORIGIN}/password/reset?code=${
    verificationCode.id
  }&exp=${expiresAt.getTime()}`;

  // send email
  const { data, error } = await sendMail({
    to: user.email,
    ...getPasswordResetTemplate(url),
  });

  if (data === null || data === undefined) {
    throw new CustomError(500, `${error?.name} - ${error?.message}`);
  }

  // return
  return {
    url,
    emailId: data.id,
  };
};

type ResetPasswordParams = {
  password: string;
  verificationCode: string;
};

export const resetPassword = async ({
  password,
  verificationCode,
}: ResetPasswordParams) => {
  // get the verification code
  const validCode = await VerificationCodeModel.findOne({
    where: {
      id: verificationCode,
      type: VerificationCodeType.PasswordReset,
      expiresAt: {
        // grater or equal to current time
        [Op.gte]: Date.now(),
      },
    },
  });

  if (!validCode) {
    throw new CustomError(404, 'Invalid or expired verification code');
  }
  // find user and update password
  const user = await UserModel.findByPk(validCode.userId);
  if (!user) {
    throw new CustomError(404, 'User not found');
  }

  const updatedUser = await UserModel.update(
    {
      password: await hashValue(password),
    },
    {
      where: {
        id: user.id,
      },
    }
  );

  if (!updatedUser) {
    throw new CustomError(500, 'Failed to reset password');
  }

  // delete verification code
  await validCode.destroy();

  // delete all sessions
  await SessionModel.destroy({
    where: {
      userId: user.id,
    },
  });

  return {
    user,
  };
};
