import { Router } from 'express';
import authMiddleware from '../app/midddlewares/auth';

import WorkerController from '../app/controllers/WorkerController';
import SessionController from '../app/controllers/SessionController';
import ReportControlller from '../app/controllers/ReportControlller';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ ok: true });
});

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/workers', WorkerController.store);
routes.post('/reports', ReportControlller.store);

export default routes;
