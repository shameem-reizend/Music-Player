import express from 'express'
import { home } from '../controller/home.controller';

const homeRouter = express.Router();

homeRouter.get('/', home);

export default homeRouter