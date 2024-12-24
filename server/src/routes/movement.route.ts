import { Router } from 'express';
import * as controllers from '../controllers/movement.controller';

const movementRoutes = Router();

movementRoutes.get('/', controllers.getMovementsHandler);
movementRoutes.post('/', controllers.createMovementHandler);
movementRoutes.patch('/:id', controllers.updateMovementHandler);

export default movementRoutes;
