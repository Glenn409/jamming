import React from 'react';
import './SearchBar.css';
import spotify from '../util/spotify.js';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term: ''
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
  }
  search(term){
    console.log(this.state.term)
    this.props.onSearch(this.state.term);

  }

  handleTermChange(event){
    this.setState({term:event.target.value})
  }

  render() {

    return (<div className="SearchBar">
              <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
              <a onClick={this.search}>SEARCH</a>
            </div>
          );
  }
}
export default SearchBar;
