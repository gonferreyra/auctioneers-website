import { ErrorRequestHandler, Response } from 'express';
import { z, ZodError } from 'zod';
import logger from '../config/logger';
import CustomError from '../utils/customError';

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join('.'),
    message: err.message,
  }));
  res.status(400).json({
    // message: error.message,
    errors,
  });
};

const handleCustomError = (res: Response, error: CustomError) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error) {
    res.statusCode = error.statusCode || 500; // sets the correct status code on error
    logger.error(
      `Error - METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - ERROR: [${error.message}]`
    );

    if (error instanceof ZodError) {
      return handleZodError(res, error);
    }

    if (error instanceof CustomError) {
      return handleCustomError(res, error);
    }

    res.send('Internal Server Error');
  } else {
    next();
  }
};

export default errorHandler;
