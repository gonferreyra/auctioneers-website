import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';

type LogResponse = {
  method: string;
  url: string;
  ip: string | undefined;
  status: number;
  duration: number;
  data?: any; // Propiedad opcional
};

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();
  const originalSend = res.send;

  res.send = (data: any): Response => {
    const duration = Date.now() - start;
    const response: LogResponse = {
      method: req.method,
      url: req.url,
      ip: req.socket.remoteAddress,
      status: res.statusCode,
      duration,
    };

    if (data) {
      response.data = data;
    }

    logger.info(
      `Incoming - METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}]`
    );

    return originalSend.call(res, data);
  };

  next();
}
