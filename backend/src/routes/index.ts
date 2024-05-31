import { Router } from 'express';
import testeRouter from './testeRoute.routes';

const routes = Router();

routes.use('/teste', testeRouter);

export default routes;