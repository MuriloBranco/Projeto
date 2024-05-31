"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const ormconfig_js_1 = __importDefault(require("../ormconfig.js"));
const dotenv = __importStar(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const express_1 = __importDefault(require("express"));
dotenv.config({
    path: '.env',
});
const app = (0, express_1.default)();
exports.AppDataSource = new typeorm_1.DataSource(ormconfig_js_1.default);
const startServer = async () => {
    try {
        await exports.AppDataSource.initialize();
        app.use(routes_1.default);
        const port = process.env.API_PORT;
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
        app.listen(port, () => {
            console.log(`Servidor está rodando na porta ${port}`);
        });
    }
    catch (error) {
        console.log("Erro ao inicializar a fonte de dados:", error);
    }
};
startServer();
//# sourceMappingURL=server.js.map