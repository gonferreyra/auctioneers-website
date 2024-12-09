import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import dbConnection from './config/db';
import { APP_ORIGIN, NODE_ENV, SERVER_PORT } from './constants/env';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import authRoutes from './routes/auth.route';

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

  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'healthy',
    });
  });

  // Authentication routes
  app.use('/auth', authRoutes);

  // Error Handler Middleware
  app.use(errorHandler);

  app.listen(SERVER_PORT, async () => {
    console.log(`Server running on port ${SERVER_PORT} in ${NODE_ENV} mode`);
    await dbConnection();
  });
};

Server();
