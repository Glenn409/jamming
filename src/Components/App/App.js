import React from 'react';
import './App.css';
import SearchBar from '../Search/SearchBar.js';
import SearchResult from '../Results/searchresult.js';
import Playlist from '../Playlist/playlist.js';
import spotify from '../util/spotify.js';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };
    this.savePlaylist = this.savePlaylist.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.search = this.search.bind(this);
  }

  search(value){
    spotify.search(value).then(searchResults =>{
      this.setState({searchResults:searchResults});
    })
  }

  addTrack(track){
    let trackChecker = false;
    this.state.playlistTracks.forEach(playlistTrack =>{
      if(playlistTrack.id === track.id){
        trackChecker = true;
      }
    })
    if(trackChecker === false){
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track){
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => {
         playlistTrack.id !== track.id})
    })
  }

  updatePlaylistName(newName){
    this.setState({playlistName:newName});
  }

  savePlaylist(){
    const uriArray = [];
    this.state.playlistTracks.forEach(track =>{
      uriArray.push(track.uri);
    })
    spotify.savePlaylist(this.state.playlistName,uriArray);
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    })
  }
  render() {

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResult searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
