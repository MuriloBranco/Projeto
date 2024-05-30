import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/user.entity";
import express from "express";

createConnection().then(async connection => {
    const app = express();
    app.use(express.json());

    app.get("/users", async (req, res) => {
        const users = await connection.manager.find(User);
        res.json(users);
    });

    app.post("/users", async (req, res) => {
        const user = await connection.manager.create(User, req.body);
        await connection.manager.save(user);
        res.status(201).json(user);
    });

    app.listen(3000, () => {
        console.log("Servidor está rodando na porta 3000");
    });
}).catch(error => console.log(error));