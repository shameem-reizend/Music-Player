 
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'myuser',
  password: 'reizend123',
  database: 'music_db',
  synchronize: true,
  logging: false,
  entities: [],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});