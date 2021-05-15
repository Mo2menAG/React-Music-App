import React from 'react';


const LibrarySong = ({
    song, 
    setSongs, 
    songs, 
    setCurrentSong, 
    audiRef, 
    isPlaying 
}) => {
    //Event HandlerS
    const songSelectHandler = async () => {
        await setCurrentSong( song );
        //add active state
        const newSongs = songs.map( (s) => {
            if( s.id === song.id){
                return{...s, active:true}
            }else{
                return{...s, active:false}
            }
        })
        await setSongs(newSongs)

        if(isPlaying){
            audiRef.current.play()
        }
        
    };

    return(
        <div onClick={ songSelectHandler } className={ `library-song ${song.active ? 'selected' : ""}`}>
            <img alt="Song Cover" src={song.cover}></img>
            <div className="song-describtion">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
            
        </div>
    );
};

export default LibrarySong