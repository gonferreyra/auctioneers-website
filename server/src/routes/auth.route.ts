import { Router } from 'express';
import * as controllers from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', controllers.registerHandler);

export default authRoutes;
