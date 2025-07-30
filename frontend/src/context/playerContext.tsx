import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

export const playerContext = createContext('');

const PlayerContextProvider = (props: React.PropsWithChildren) => {

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const seekBg = useRef<HTMLDivElement | null>(null);
    const seekBar = useRef<HTMLDivElement | null>(null);

    const url = 'http://localhost:3000';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(songsData[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        if(audioRef.current){
            audioRef.current.play();
            setIsPlaying(true);
        }
    }
    
    const pause = () => {
        if(audioRef.current){
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }

    const playWithId = async (id:number) => {
        await setTrack(songsData[id-1]);
        if(audioRef.current){
            await audioRef.current.play();
            setIsPlaying(true);
        }
    }

    const previous = async () => {
        const currentIndex = songsData.findIndex(song => song.id === track.id);
        if(currentIndex > 0) {
            await setTrack(songsData[currentIndex - 1]);
            if(audioRef.current){
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            await setTrack(songsData[songsData.length - 1]);
            if(audioRef.current){
                await audioRef.current.play();
                setIsPlaying(true);
            }
        }
    }

    const next = async () => {
        const currentIndex = songsData.findIndex(song => song.id === track.id);
        if(currentIndex < songsData.length - 1) {
            await setTrack(songsData[currentIndex + 1]);
            if(audioRef.current){
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            await setTrack(songsData[0]);
            if(audioRef.current){
                await audioRef.current.play();
                setIsPlaying(true);
            }
        }
    }

    const seekSong = async (e: React.MouseEvent<HTMLDivElement>) => {
        if(audioRef.current && seekBg.current){
            audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
        }
    }

    const fetchSongs = async () => {
        try {
            const response = await axios.get(`${url}/song/list`);
            if(response.data.success){
                setSongsData(response.data.songsData);
                setTrack(response.data.songsData[0])
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/album/list`);
            if(response.data.success){
                setAlbumsData(response.data.albumsData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if(audioRef.current){
                audioRef.current.ontimeupdate = () => {
                    if(audioRef.current && seekBar.current){

                        seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + '%';

                        setTime({
                            currentTime: {
                                second: Math.floor(audioRef.current.currentTime % 60),
                                minute: Math.floor(audioRef.current.currentTime / 60)
                            },
                            totalTime: {
                                second: Math.floor(audioRef.current.duration % 60),
                                minute: Math.floor(audioRef.current.duration / 60)
                            }
                        })
                    }
                }
            }
        }, 1000)
    }, [audioRef]);

    useEffect(() => {
        fetchSongs();
        fetchAlbums();
    }, [])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        isPlaying,setIsPlaying,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        songsData, albumsData
    }

    return (
        <playerContext.Provider value={contextValue}>
            {props.children}
        </playerContext.Provider>
    )
}

export default PlayerContextProvider;