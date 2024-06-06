import { Router } from 'express';
import { LevelController } from '../controllers/LevelController';

const levelRouter = Router();
const levelController  = new LevelController();

levelRouter.post("/niveis", levelController.create);
levelRouter.get("/niveis", levelController.index);
levelRouter.get("/niveis/:id", levelController.getById);
levelRouter.put("/niveis/:id", levelController.update);
levelRouter.delete("/niveis/:id", levelController.delete);

export default levelRouter;
