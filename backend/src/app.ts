import express from 'express';
import homeRouter from './router/home.routes';

const app = express();

app.use('', homeRouter)

export default app;