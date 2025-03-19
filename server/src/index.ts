import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import dbConnection from './config/db';
import { APP_ORIGIN, NODE_ENV, SERVER_PORT } from './constants/env';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import authRoutes from './routes/auth.route';
import logger from './config/logger';
import { loggerMiddleware } from './middleware/loggerHandler';
import authenticate from './middleware/authenticate';
import userRoutes from './routes/user.route';
import sessionRoutes from './routes/session.route';
import caseRoutes from './routes/case.route';
import movementRoutes from './routes/movement.route';

const app = express();

const Server = async () => {
  // JSON - reading and parsing body
  app.use(express.json());
  // URL - reading and parsing body
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: APP_ORIGIN,
      credentials: true,
    })
  );
  // Cookie Parser Middleware
  app.use(cookieParser()); // parse cookies - req.cookies available

  // Logger Middleware
  app.use(loggerMiddleware);

  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'healthy',
    });
  });

  // Authentication routes
  app.use('/auth', authRoutes);

  // Protected routes
  app.use('/user', authenticate, userRoutes);
  app.use('/sessions', authenticate, sessionRoutes);
  app.use('/cases', authenticate, caseRoutes);
  app.use('/movements', authenticate, movementRoutes);

  // Error Handler Middleware
  app.use(errorHandler);

  app.listen(SERVER_PORT, async () => {
    logger.info(`Server running on port ${SERVER_PORT} in ${NODE_ENV} mode`);
    await dbConnection();
  });
};

Server();
