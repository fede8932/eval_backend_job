import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASS || null,
  database: process.env.DATABASE_NAME,
  logging: true,
  synchronize: false,
  migrationsRun: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
});
