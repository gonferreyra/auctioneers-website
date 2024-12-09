import { ErrorRequestHandler, Response } from 'express';
import { z, ZodError } from 'zod';

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join('.'),
    message: err.message,
  }));
  return res.status(400).json({
    // message: error.message,
    errors,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);

  if (error instanceof ZodError) {
    handleZodError(res, error);
  }

  res.status(500).send('Internal Server Error');
};

export default errorHandler;
