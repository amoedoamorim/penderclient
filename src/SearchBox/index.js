import React, { Component } from 'react';
import $ from 'jquery';

class SearchBox extends Component {
  constructor(){
    super();
    this.state = {unavailable: false};
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validateURL(this.refs.mediaURL.value)){
      this.doRequest(this.refs.mediaURL.value);
    } else {
      alert('A valid URL is required.');
    }
  }

  validateURL(url){
    let regex = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i');

    return (regex.test(url));
  }

  isPenderAvailable(){
    $.ajax({
      url: 'http://pender.qa.checkmedia.org:80/api/medias?url=https://twitter.com/amoedoamorim',
      method: 'GET',
      headers: {
        'X-Pender-Token': this.props.token
      },
      success: function(){
        console.log('service available');
        this.setUnavailableState(false);
      }.bind(this),
      error: function(xhr, status, err){
        console.log('service NOT available');
        this.setUnavailableState(true);
      }.bind(this)
    });
  }

  doRequest(mediaURL) {
    var API_URL = 'http://pender.qa.checkmedia.org:80/api/medias?url=';

    $.ajax({
      url: API_URL + mediaURL,
      method: 'GET',
      headers: {
        'X-Pender-Token': this.props.token
      },
      success: function(data){
        this.props.onResponse(mediaURL, data);
      }.bind(this),
      error: function(xhr, status, err){
        alert('Oops... Something went wrong!' +
        '\nStatus: ' + status + ' ' + xhr.status +
        '\nError: ' + err); //Todo: show error message from server
        this.testServiceAvailability();
      }.bind(this)
    });
  }

  componentDidMount(){
    this.testServiceAvailability();
  }

  testServiceAvailability(){
    if (navigator.onLine){
      this.isPenderAvailable();
    } else {
      this.setUnavailableState(true);
    }
  }

  setUnavailableState(unavailable){
    let state = this.state;
    state.unavailable = unavailable;
    this.setState(state);
  }

  render() {
    let opts = {};
    let statusMsg = '';

    if (this.state.unavailable === true){
      opts.disabled = 'disabled';
      statusMsg = <strong>Service is unavailable. Please try again later.</strong>
    }

    return (
      <div className="SearchBox">
        <h1>Get Media Metadata</h1>
        <p>{statusMsg}</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="url-input">Enter URL: </label>
          <input type="text" ref="mediaURL" id="url-input" {...opts}></input>
          <button {...opts}>Go!</button>
        </form>
      </div>
    );
  }
}

export default SearchBox;
