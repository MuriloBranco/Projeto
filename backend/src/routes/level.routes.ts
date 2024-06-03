import { Router } from 'express';
import { LevelController } from '../controllers/LevelController';

const levelRouter = Router();
const developerController  = new LevelController();

levelRouter.post("/niveis", developerController.create);
levelRouter.get("/niveis", developerController.getAll);
levelRouter.get("/niveis/:id", developerController.getById);
levelRouter.put("/niveis/:id", developerController.update);
levelRouter.delete("/niveis/:id", developerController.delete);

export default levelRouter;
