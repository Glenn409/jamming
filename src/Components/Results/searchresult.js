import React from 'react';
import './searchresult.css';
import TrackList from '../Tracklist/tracklist.js';

class SearchResult extends React.Component {
test(){
  }

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd}/>
      </div>
    )
  }
}
export default SearchResult;
