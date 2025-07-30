import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { toast } from 'react-toastify'

interface Album {
  name: string
}

interface dataPropType{
  id: number
  name: string;
  image_url: string;
  song_url: string;
  desc: string;
  album: Album;
  duration: string
}

export const ListSong: React.FC = () => {

  const [songData, setSongData] = useState<dataPropType[]>([])

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/song/list`);
      if(response.data.success){
        setSongData(response.data.songsData)
        console.log(response.data)
      }
    } catch (error) {
      toast.error("Error occured");
      console.log(error);
    }
  }

  const removeSong = async (songId: number) => {
    try{
      const response = await axios.delete(`${url}/song/${songId}`);
      if(response.data.success){
        toast.success('Song removed');
        await fetchSongs();
      }
    } catch(error){
      toast.error('Error occured');
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSongs();
  }, [])

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duratiion</b>
          <b>Action</b>
        </div>
        {songData.map((item, index) => {
          return(
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img src={item.image_url} className='w-12' alt="" />
              <p>{item.name}</p>
              <p>{item.album.name}</p>
              <p>{item.duration}</p>
              <p className='cursor-pointer' onClick={() => removeSong(item.id)}>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
