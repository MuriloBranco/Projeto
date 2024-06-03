"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const developerRouter = (0, express_1.Router)();
const teste = [];
developerRouter.get('/api/niveis', async (request, response) => {
    return response.status(200).json();
});
exports.default = developerRouter;
//# sourceMappingURL=developer.routes.js.map