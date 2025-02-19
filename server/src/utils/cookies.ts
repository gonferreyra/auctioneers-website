import { Response } from 'express';
import { thirtyDaysFromNow, twoHoursFromNow } from './date';

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
      expires: twoHoursFromNow(),
    })
    .cookie('refreshToken', refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
      secure,
      expires: thirtyDaysFromNow(),
      path: '/auth/refresh',
    });
};

export const clearAuthenticationCookies = (res: Response) => {
  return res.clearCookie('accessToken').clearCookie('refreshToken', {
    path: '/auth/refresh',
  });
};
