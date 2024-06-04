import { DataSourceOptions } from 'typeorm';
import { config as loadEnv } from 'dotenv';

loadEnv();

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  synchronize: true,
  logging: false,
  entities: ['./src/models/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  subscribers: ['./src/subscriber/**/*.ts'],
};

export default config;