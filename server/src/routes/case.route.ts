import { Router } from 'express';
import * as controllers from '../controllers/case.controller';

const caseRoutes = Router();

caseRoutes.get('/', controllers.getCasesHandler);
caseRoutes.get('/:id', controllers.getCaseByIdHandler);

export default caseRoutes;
