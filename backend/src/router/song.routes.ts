import express from 'express'
import { listSong, removeSong, uploadSong } from '../controller/song.controller'
import { upload } from '../config/multer-config'
const songRoutes = express.Router()

songRoutes.post('/upload', upload.fields([
    {name: 'song', maxCount: 1},
    {name: 'image', maxCount: 1},
]), uploadSong);
songRoutes.get('/list', listSong);
songRoutes.delete('/:songId', removeSong);

export default songRoutes