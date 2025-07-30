import React, { useEffect, useState } from 'react'
import { url } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

interface albumPropType{
  id: number;
  name: string;
  desc: string;
  bgColor: string;
  image_url: string;
}

export const ListAlbum: React.FC = () => {

  const [albumData, setAlbumData] = useState<albumPropType[]>([]);

  const fetchAlbum = async () => {

    try {
      const response = await axios.get(`${url}/album/list`);
      console.log(response.data);
      if(response.data.success){
        setAlbumData(response.data.albumsData);
      }
    } catch (error) {
      toast.error('Error occured');
      console.log(error);
    }

  }

  const removeAlbum = async (albumId: number) => {
    try{
      const response = await axios.delete(`${url}/album/${albumId}`);
      if(response.data.success){
        toast.success(response.data.message);
        await fetchAlbum();
      }
    } catch(error){
      toast.error('Error occured');
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAlbum();
  }, [])

  return (
     <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>
        {albumData.map((item, index) => {
          return(
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img src={item.image_url} className='w-12' alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" defaultValue={item.bgColor} />
              <p className='cursor-pointer' onClick={() => removeAlbum(item.id)}>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
