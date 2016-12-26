import React, { Component } from 'react';
import SearchBox from './SearchBox';
import MediaList from './MediaList';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      history: [],
      component: 'search'
    };
  }

  onPenderResponse(mediaURL, data){
    let newItem = {};

    newItem.mediaURL = mediaURL;
    newItem.response = data;

    let history = this.state.history;
    history.unshift(newItem);
    this.storeOnLocalStorage(history);
    this.setState({history: history, component: 'mediaList'});
  }

  storeOnLocalStorage(history){
    localStorage.setItem('history', JSON.stringify(history));
  }

  retrieveFromLocalStorage(){
    let history = JSON.parse(localStorage.getItem('history'));

    if (history){
      this.setState({history: history});
    }
  }

  componentDidMount(){
    this.retrieveFromLocalStorage();
  }

  navigateTo(component){
    let state = this.state;
    state.component = component;

    this.setState(state);
  }

  showMediaList(){
    this.navigateTo('list');
  }

  showSearchBox(){
    this.navigateTo('search');
  }

  render() {
    let component;

    if (this.state.component === 'search'){
      component = <div>
        <SearchBox onResponse={this.onPenderResponse.bind(this)} token="your-api-token-here"/>
        <p><a href="#!" onClick={this.showMediaList.bind(this)}>See cached metadata entries</a></p>
      </div>
    } else {
      component = <div>
        <MediaList history={this.state.history} />
        <p><a href="#!" onClick={this.showSearchBox.bind(this)}>Back to search</a></p>
      </div>
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Pender Client</h2>
        </div>
        {component}
      </div>
    );
  }
}

export default App;
