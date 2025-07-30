import { Album } from "../model/Album";
import { AppDataSource } from "../config/data-source";
import { uploadToCloudinary } from "./song.controller";

export const addAlbum = async (req: any, res: any) => {
    const { name, desc, bgColor } = req.body;
    const albumRepo = AppDataSource.getRepository(Album);

    const existing = await albumRepo.find({where: {name}}); 
    if(existing.length > 0){
        res.status(409).json({
            error: "Album already exists"
        })
        return
    }

    const image = req.file;

    if(!image){
        res.status(400).json({
            error: "Album image is required"
        })
        return
    }

    try {
        
        const imageUpload = await uploadToCloudinary(image, 'image')

        const newAlbum = await albumRepo.create({
            name,
            desc,
            bgColor,
            image_url: imageUpload.url
        })

        const savedAlbum = await albumRepo.save(newAlbum);

        res.status(200).json({
            success: true,
            savedAlbum
        })

    } catch (error) {
        res.status(500).json({
            error: "upload Failed", details: error
        })
    }

}

export const listAlbum = async (req: any, res: any) => {
    
    const albumRepo = AppDataSource.getRepository(Album)

    try { 
        const albumsData = await albumRepo.find();
        res.status(200).json({
            success: true,
            albumsData
        })
    } catch (error) {
        res.status(500).json({
            error: "cannot fetch albums",
            details: error
        })
    }

}

export const removeAlbum = async (req: any, res: any) => {

    const albumRepo = AppDataSource.getRepository(Album);
    const { albumId } = req.params;

    try {
        const album = await albumRepo.findOneBy({ id: albumId });
        if(album){
            albumRepo.remove(album);
        }
        res.status(200).json({ success: true, message: 'Album removed' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove', details: error })
    }

}