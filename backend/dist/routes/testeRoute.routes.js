"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testeRouter = (0, express_1.Router)();
testeRouter.get('/', async (request, response) => {
    return response.status(200).json({
        status: 'teste',
    });
});
exports.default = testeRouter;
//# sourceMappingURL=testeRoute.routes.js.map