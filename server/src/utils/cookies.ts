import { CookieOptions, Response } from 'express';
import { fifteenMinutesFromNow, thirtyDaysFromNow } from './date';

const secure = process.env.NODE_ENV !== 'development';

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const setAuthenticationCookies = ({
  res,
  accessToken,
  refreshToken,
}: Params) => {
  return res
    .cookie('accessToken', accessToken, {
      sameSite: 'strict',
      httpOnly: true,
      secure,
      expires: fifteenMinutesFromNow(),
    })
    .cookie('refreshToken', refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
      secure,
      expires: thirtyDaysFromNow(),
      path: '/auth/refresh',
    });
};
