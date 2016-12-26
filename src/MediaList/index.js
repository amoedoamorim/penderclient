import React, { Component } from 'react';
import MediaItem from '../MediaItem';

class MediaList extends Component {
  constructor(){
    super();
    this.state = {pageSize: 0};
  }

  loadMore(){
    this.setPageSize(this.state.pageSize += 20);
  }

  setPageSize(size){
    let newState = this.state;
    newState.pageSize = size;

    if (newState.pageSize >= this.props.history.length){
      newState.pageSize = this.props.history.length;
    }

    this.setState(newState);
  }

  componentDidMount(){
    this.setPageSize(20);
  }

  render() {
    let mediaItems;

    if (this.props.history){
      mediaItems = this.props.history.slice(0, this.state.pageSize).map(item => {
        return (
          <MediaItem media={item} />
        );
      });
    }

    return (
      <div className="MediaList">
        <h1>Media List</h1>
        <p>Showing {this.state.pageSize} elements of {this.props.history.length}</p>
        <a href="#!" onClick={this.loadMore.bind(this)}>Load more</a>
        <ul>
          {mediaItems}
        </ul>
      </div>
    );
  }
}

export default MediaList;
