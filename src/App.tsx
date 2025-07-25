import React, { useContext } from 'react'
import { SideBar } from './components/SideBar'
import { Player } from './components/Player'
import { Display } from './components/Display'
import { playerContext } from './context/playerContext'

export const App: React.FC = () => {

  const {audioRef, track} = useContext(playerContext);

  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <SideBar /> 
        <Display />
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload='auto'></audio>
    </div>
  )
}
