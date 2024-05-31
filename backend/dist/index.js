"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const express_1 = __importDefault(require("express"));
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "projeto",
    synchronize: true,
    logging: true,
    entities: [user_entity_1.User],
});
AppDataSource.initialize().then(async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/users", async (req, res) => {
        const users = await AppDataSource.manager.find(user_entity_1.User);
        res.json(users);
    });
    app.post("/users", async (req, res) => {
        const user = AppDataSource.manager.create(user_entity_1.User, req.body);
        await AppDataSource.manager.save(user);
        res.status(201).json(user);
    });
    app.listen(3000, () => {
        console.log("Servidor está rodando na porta 3000");
    });
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map