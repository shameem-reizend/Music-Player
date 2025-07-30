 
import { DataSource } from 'typeorm';
import { Song } from '../model/Song';
import { Album } from '../model/Album';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'myuser',
  password: 'reizend123',
  database: 'music_db',
  synchronize: true,
  logging: false,
  entities: [Song, Album],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});