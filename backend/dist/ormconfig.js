"use strict";
const configTypeORM = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "projeto",
    synchronize: true,
    logging: false,
    entities: ['./src/entity/**/*.ts'],
    migrations: ['./src/migrations/*.ts'],
    subscribers: ['./src/subscriber/**/*.ts'],
    cli: {
        entitiesDir: './src/entity',
        migrationsDir: './src/migrations',
        subscribersDir: './src/subscriber',
    },
};
module.exports = configTypeORM;
//# sourceMappingURL=ormconfig.js.map