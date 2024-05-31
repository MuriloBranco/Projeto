"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const ormconfig_js_1 = __importDefault(require("../ormconfig.js"));
const express_1 = __importDefault(require("express"));
exports.AppDataSource = new typeorm_1.DataSource(ormconfig_js_1.default);
exports.AppDataSource.initialize().then(async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/users", async (req, res) => {
        const users = await exports.AppDataSource.manager.find(user_entity_1.User);
        res.json(users);
    });
    app.post("/users", async (req, res) => {
        const user = exports.AppDataSource.manager.create(user_entity_1.User, req.body);
        await exports.AppDataSource.manager.save(user);
        res.status(201).json(user);
    });
    app.listen(3000, () => {
        console.log("Servidor está rodando na porta 3000");
    });
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map