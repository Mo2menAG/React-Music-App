import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
    audiRef, 
    isPlaying, 
    setIsPlaying, 
    setPlayPauseButton, 
    playPauseButton, 
    setSongInfo, 
    songInfo,
    songs,
    setSongs,
    currentSong,
    setCurrentSong
}) => { 
    //
    const activeSongInLibrary = async (choosenSong) => {
        const newSongs = songs.map( (s) => {
            if( s.id === choosenSong.id){
                return{...s, active:true}
            }else{
                return{...s, active:false}
            }
        })
        await setSongs(newSongs)
    }
    //Event Handlers
    const playSongHandler = () => {
        
        if (isPlaying){
            audiRef.current.pause();
            setIsPlaying(false);
            setPlayPauseButton(faPlay)
        }else{
            audiRef.current.play();
            setIsPlaying(!isPlaying);
            setPlayPauseButton(faPause)
        }     
    }

    const timeFormating = (time) => {
        return (
            Math.floor(time/60) + "." + Math.floor(time%60)
        )
    }

    const dragHandler = (e) => {
        audiRef.current.currentTime =  e.target.value;
        setSongInfo({
            ...songInfo, 
            currentTime: e.target.value, 
        })
    }

    const skipTrackHandler = async (direction) => {
        const currentSongIndex = songs.findIndex( (song) => song.id === currentSong.id) 
        if(direction==="skip-forword"){
            await setCurrentSong( songs[(currentSongIndex + 1) % songs.length ]) 
            activeSongInLibrary(songs[(currentSongIndex + 1) % songs.length ])       
        }
        else{
            await setCurrentSong( songs[(currentSongIndex - 1 + songs.length) % songs.length ])
            activeSongInLibrary( songs[(currentSongIndex - 1 + songs.length) % songs.length ])
        }
        if(isPlaying){
            audiRef.current.play()
        }
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{timeFormating(songInfo.currentTime)}</p>
                <input 
                    type="range"
                    min={0}
                    max={ songInfo.duration || 0}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                />
                <p>{timeFormating(songInfo.duration)==="NaN.NaN"? "0.0" : timeFormating(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler("skip-back")} 
                    className="skip-back" 
                    size="2x" 
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    size="2x" 
                    icon={playPauseButton}
                />
                <FontAwesomeIcon 
                    onClick={ () => skipTrackHandler("skip-forword")} 
                    className="skip-forword" 
                    size="2x" 
                    icon={faAngleRight}
                />
            </div>
        </div>
    );
}

export default Player