import { AppDataSource } from '../config/data-source';
import cloudinary from '../config/cloudinary.config';
import streamifier from 'streamifier';
import { Song } from '../model/Song';
import { error } from 'console';


export const uploadToCloudinary = (
  file: Express.Multer.File,
  type: 'image' | 'video'
): Promise<{ url: string; duration?: number }> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: type },
      (err, result) => {
        if (err) return reject(err);
        resolve({
          url: result?.secure_url || '',
          duration: result?.duration || '',
        });
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};


export const uploadSong = async (req: any, res: any) => {

    const {name, desc, album} = req.body;
    const songRepo = AppDataSource.getRepository(Song);
    const existing = await songRepo.find({where: {name}});
    if(existing.length > 0){
        res.status(409).json({
            error: "Song already exists"
        })
        return
    }

    const files = req.files as {
        image?: Express.Multer.File[],
        song?: Express.Multer.File[]
    };

    if(!files?.image?.[0] || !files.song?.[0]){
        res.status(400).json({
            error: "Both image and song are required"
        })
        return
    }

    try {
        const imageUpload = await uploadToCloudinary(files.image[0], 'image');
        const songUpload = await uploadToCloudinary(files.song[0], 'video');
        const duration = `${Math.floor(songUpload.duration! / 60)}:${Math.floor(songUpload.duration! % 60)}`

        const newSong = songRepo.create({
            name,
            desc,
            duration: duration,
            image_url: imageUpload.url,
            song_url: songUpload.url,
            album: album
        })

        const savedSong = await songRepo.save(newSong);

        res.status(200).json({
            success: true,
            message: "Song uploaded successfully",
            savedSong
         });
    } catch (err) {
        res.status(500).json({ error: 'Upload failed', details: err });
    }
    
}

export const listSong = async (req: Request, res: any) => {
    
    const songRepo = AppDataSource.getRepository(Song);
    try{
        const songsData = await songRepo.find({
            relations: ['album']
        });
        res.status(200).json({
            success: true,
            songsData
        })
    }
    catch(err){
        res.status(500).json({ error: 'Upload failed', details: err });
    }

}

export const removeSong = async(req: any, res: any) => {

    const songRepo = AppDataSource.getRepository(Song);
    const { songId } = req.params
    try {
        const song = await songRepo.findOneBy({id: songId})
        if(song){
            songRepo.remove(song)
        }
        res.status(200).json({ success: true, message: 'song removed' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove', details: error })
    }
}