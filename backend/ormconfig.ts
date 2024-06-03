import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'projeto',
  synchronize: true,
  logging: false,
  entities: ['./src/models/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  subscribers: ['./src/subscriber/**/*.ts'],
};

export default config;