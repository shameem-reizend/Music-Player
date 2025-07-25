import React from 'react'
import { Navbar } from './Navbar';
import { albumsData, songsData } from '../assets/assets';
import { AlbumItem } from './AlbumItem';
import { SongItem } from './SongItem';

export const DisplayHome: React.FC = () => {
  return (
    <>
        <Navbar />

        <div className="mb-4">
            <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
            <div className="flex overflow-auto">
                {albumsData.map((data, index) => (
                    <AlbumItem key={index} name={data.name} desc={data.desc} id={data.id} image={data.image}/>
                ))}
            </div>
        </div>

        <div className="mb-4">
            <h1 className='my-5 font-bold text-2xl'>Today's Biggest Hits </h1>
            <div className="flex overflow-auto">
                {songsData.map((data, index) => (
                    <SongItem key={index} name={data.name} desc={data.desc} id={data.id} image={data.image}/>
                ))}
            </div>
        </div>
    </>
  )
}
