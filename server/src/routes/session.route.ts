import { Router } from 'express';
import * as controllers from '../controllers/session.controller';

const sessionRoutes = Router();

sessionRoutes.get('/', controllers.getSessionHandler);
sessionRoutes.delete('/:id', controllers.deleteSessionHandler);

export default sessionRoutes;
