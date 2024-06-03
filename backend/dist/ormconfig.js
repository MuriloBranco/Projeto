"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'projeto',
    synchronize: true,
    logging: false,
    entities: ['./src/entity/**/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    subscribers: ['./src/subscriber/**/*.ts'],
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map