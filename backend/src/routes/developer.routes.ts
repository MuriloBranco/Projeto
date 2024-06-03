import { Router } from 'express';
import { DeveloperController } from '../controllers/DeveloperController';

const developerRouter = Router();
const developerController  = new DeveloperController();

developerRouter.post("/desenvolvedores", developerController.create);
developerRouter.get("/desenvolvedores", developerController.getAll);
developerRouter.get("/desenvolvedores/:id", developerController.getById);
developerRouter.put("/desenvolvedores/:id", developerController.update);
developerRouter.delete("/desenvolvedores/:id", developerController.delete);

export default developerRouter;
