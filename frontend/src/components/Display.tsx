import React, { useContext, useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { DisplayHome } from './DisplayHome'
import { DisplayAlbum } from './DisplayAlbum'
import { playerContext } from '../context/playerContext'


export const Display: React.FC = () => {

    const { albumsData } = useContext(playerContext)

    const displayRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const isAlbum = location.pathname.includes('album');
    const albumId = isAlbum ? location.pathname.split('/').pop() : "";
    const bgColor = isAlbum ? albumsData.find((album) => (album.id == albumId)).bgColor : '#121212';


    useEffect(() => {
        if(displayRef.current){
            if(isAlbum){
                displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
            } else{
                displayRef.current.style.background = `#121212`;
            }
        }
    })

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:ml-0'>
        <Routes>
            <Route path='/' element={<DisplayHome />} />
            <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((album) => (album.id == albumId))}/>} />
        </Routes>
    </div>
  )
}
