
import "reflect-metadata";

import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import express from 'express';
import developerRouter from "./routes/developer.routes";
import levelRouter from "./routes/level.routes"
import { AppDataSource } from "./data-source";
import swaggerFile from "./swagger.json";
import cors from 'cors';

dotenv.config({
    path:  '.env',
  });

const app = express();

const startServer = async () => {
  try {
      await AppDataSource.initialize();
      app.use(cors());
      app.use(routes);
      const port = process.env.API_PORT;
      app.use(express.json());
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

      app.use("/api", developerRouter);
      app.use("/api", levelRouter);



      app.listen(port, () => {
          console.log(`Servidor está rodando na porta ${port}`);
      });
  } catch (error) {
      console.log("Erro ao inicializar a fonte de dados:", error);
  }
};

startServer();