import { Router } from 'express';
import * as controllers from '../controllers/case.controller';

const caseRoutes = Router();

caseRoutes.get('/', controllers.getCasesHandler);
caseRoutes.get('/:id', controllers.getCaseByIdHandler);
caseRoutes.post('/', controllers.createCaseHandler);
caseRoutes.patch('/:id', controllers.updateCaseHandler);
caseRoutes.delete('/:id', controllers.deleteCaseHandler);

export default caseRoutes;
