import React, { Component } from 'react';
import MediaItem from '../MediaItem';

class MediaList extends Component {
  constructor(){
    super();
    this.state = {pageSize: 0};
  }

  loadMore(){
    this.setPageSize(this.state.pageSize + 20);
  }

  setPageSize(size){
    this.setState({
      pageSize: Math.min(size, this.props.history.length)
    });
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
