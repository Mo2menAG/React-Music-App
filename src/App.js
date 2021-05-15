//Import react
import React, {useState, useRef} from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

//Import styles
import "./styles/app.scss";

//Adding components
import Player from "./components/Player";
import Song from "./components/Song";
import Nav from "./components/Nav"
import Library from "./components/Library" ;

//Import data
import data from "./Data";


function App() {
  //state
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [playPauseButton, setPlayPauseButton] =  useState(faPlay);
  
  //Ref
  const audiRef = useRef(null);

  const timeUpdateHandler = (e) => {
    setSongInfo({
                    ...songInfo, 
                    currentTime: e.target.currentTime, 
                    duration: e.target.duration  
                })
  }

  const songEndedHandler = async () => {
    console.log("hi");
    const currentSongIndex = songs.findIndex( (song) => song.id === currentSong.id)
    await setCurrentSong( songs[(currentSongIndex + 1) % songs.length ]) 
    if(isPlaying){
      audiRef.current.play()
  }
  }

  return (
    <div className={`App ${ libraryStatus ? "library-active" : ""} `}>
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus} 
      />
      <Song currentSong={currentSong} />
      <Player 
        audiRef={audiRef}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs} 
        setSongs={setSongs}
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        playPauseButton={playPauseButton}
        setPlayPauseButton={setPlayPauseButton}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />
      <Library 
        songs={songs} 
        currentSong={currentSong} 
        setCurrentSong={setCurrentSong}
        audiRef={audiRef}
        isPlaying={isPlaying} 
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler}
        ref={audiRef} 
        onEnded={songEndedHandler}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default App;
