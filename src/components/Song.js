import React from 'react';

const Song = ({currentSong}) => {
    return(
        <div className="song-container">
            <img alt="Song Cover" src={currentSong.cover}></img>
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    );
}

export default Song