import { Router } from 'express';
import WorkerController from '../app/controllers/WorkerController';
import SessionController from '../app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ ok: true });
});

routes.post('/workers', WorkerController.store);
routes.post('/sessions', SessionController.store);

export default routes;
