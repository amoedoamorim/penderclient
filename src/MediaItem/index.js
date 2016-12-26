import React, { Component } from 'react';

class MediaItem extends Component {
  render() {
    return (
      <div>
        <code>
          <small>
          {this.props.media.response.data.embed_tag}
          </small>
        </code>
      </div>
    );
  }
}

export default MediaItem;
