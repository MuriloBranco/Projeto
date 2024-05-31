
import "reflect-metadata";

import { DataSource, DataSourceOptions  } from "typeorm";
import { User } from "./entity/user.entity";
import config from "../ormconfig.js";
import * as dotenv from 'dotenv';
import routes from './routes';
import express from 'express';

dotenv.config({
    path:  '.env',
  });

const app = express();

export const AppDataSource = new DataSource(config)

const startServer = async () => {
  try {
      await AppDataSource.initialize();
      app.use(routes);
      const port = process.env.API_PORT;
      app.use(express.json());

      app.get("/users", async (req, res) => {
          const users = await AppDataSource.manager.find(User);
          res.json(users);
      });

      app.post("/users", async (req, res) => {
          const user = AppDataSource.manager.create(User, req.body);
          await AppDataSource.manager.save(user);
          res.status(201).json(user);
      });

      app.listen(port, () => {
          console.log(`Servidor está rodando na porta ${port}`);
      });
  } catch (error) {
      console.log("Erro ao inicializar a fonte de dados:", error);
  }
};

startServer();