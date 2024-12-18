import { Router } from 'express';
import * as controllers from '../controllers/case.controller';

const caseRoutes = Router();

caseRoutes.get('/', controllers.getCasesHandler);

export default caseRoutes;
