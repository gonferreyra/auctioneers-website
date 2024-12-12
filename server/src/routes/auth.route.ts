import { Router } from 'express';
import * as controllers from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', controllers.registerHandler);
authRoutes.post('/login', controllers.loginHandler);

export default authRoutes;
