import { RequestHandler } from 'express';
import CustomError, { AppErrorCode } from '../utils/customError';
import { verifyToken } from '../utils/jwt';

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;

  if (!accessToken) {
    throw new CustomError(401, 'Unauthorized', AppErrorCode.InvalidAccessToken);
  }

  const { error, payload } = verifyToken(accessToken);

  if (!payload) {
    throw new CustomError(
      401,
      error === 'jwt expired' ? 'Token expired' : 'Invalid Token',
      AppErrorCode.InvalidAccessToken
    );
  }

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;

  next();
};

export default authenticate;
