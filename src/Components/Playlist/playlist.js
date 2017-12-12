import React from 'react';
import './playlist.css';
import TrackList from '../Tracklist/tracklist.js';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    const playlistName = event.target.value;
    this.props.onNameChange(playlistName);
  }

  render(){
    return(
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue="New Playlist"/>
        <TrackList tracks={this.props.playlistTracks} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}
export default Playlist;
