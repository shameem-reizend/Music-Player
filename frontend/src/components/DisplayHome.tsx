import React, { useContext } from 'react'
import { Navbar } from './Navbar';
import { AlbumItem } from './AlbumItem';
import { SongItem } from './SongItem';
import { playerContext } from '../context/playerContext';

export const DisplayHome: React.FC = () => {

    const {songsData, albumsData} = useContext(playerContext);

  return (
    <>
        <Navbar />

        <div className="mb-4">
            <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
            <div className="flex overflow-auto">
                {albumsData.map((data, index) => (
                    <AlbumItem key={index} name={data.name} desc={data.desc} id={data.id} image={data.image_url}/>
                ))}
            </div>
        </div>

        <div className="mb-4">
            <h1 className='my-5 font-bold text-2xl'>Today's Biggest Hits </h1>
            <div className="flex overflow-auto">
                {songsData.map((data, index) => (
                    <SongItem key={index} name={data.name} desc={data.desc} id={data.id} image={data.image_url}/>
                ))}
            </div>
        </div>
    </>
  )
}
