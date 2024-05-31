import { Router } from 'express';

const testeRouter = Router();

testeRouter.get('/', async (request, response) => {
  return response.status(200).json({
    status: 'teste',
  });
});

export default testeRouter;
