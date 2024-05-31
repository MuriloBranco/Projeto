"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testeRoute_routes_1 = __importDefault(require("./routes/testeRoute.routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/teste', testeRoute_routes_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=server.js.map