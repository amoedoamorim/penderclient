import React, { Component } from 'react';

class MediaItem extends Component {
  render() {
    return (
      <div className="result">
          <small>
          <strong>Media URL: </strong>
          {this.props.media.mediaURL}
          <br />
          <strong>Embed Tag: </strong>
          <code>
          {this.props.media.response.data.embed_tag}
          </code>
          </small>
      </div>
    );
  }
}

export default MediaItem;
