import express from 'express';
import homeRouter from './router/home.routes';
import songRoutes from './router/song.routes';
import cors from 'cors'
import albumRoutes from './router/albums.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('', homeRouter);
app.use('/song', songRoutes);
app.use('/album', albumRoutes)

export default app;
