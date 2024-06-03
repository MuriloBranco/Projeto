import { Router } from 'express';
import testeRouter from './developer.routes';

const routes = Router();

routes.use('/teste', testeRouter);

export default routes;