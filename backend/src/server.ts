
import "reflect-metadata";

import * as dotenv from 'dotenv';
import routes from './routes';
import express from 'express';
import developerRoutes from "./routes/developer.routes";
import { AppDataSource } from "./data-source";

dotenv.config({
    path:  '.env',
  });

const app = express();

const startServer = async () => {
  try {
      await AppDataSource.initialize();
      app.use(routes);
      const port = process.env.API_PORT;
      app.use(express.json());
      app.use("/api", developerRoutes);


      app.listen(port, () => {
          console.log(`Servidor está rodando na porta ${port}`);
      });
  } catch (error) {
      console.log("Erro ao inicializar a fonte de dados:", error);
  }
};

startServer();