import express from 'express'
import { upload } from '../config/multer-config';
import { addAlbum, listAlbum, removeAlbum } from '../controller/album.controller';

const albumRoutes = express.Router();

albumRoutes.post('/upload', upload.single('image'), addAlbum);
albumRoutes.get('/list', listAlbum);
albumRoutes.delete('/:albumId', removeAlbum);

export default albumRoutes;