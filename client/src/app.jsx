import React from 'react';
import ReactDOM from 'react-dom';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import axios from 'axios';
import PKMap from './components/Map/PKMap.jsx';
import Home from './components/Home.jsx';
import Navigation from './components/Navigation.jsx';
import Users from './components/Users/Users.jsx';
import Events from './components/Events/Events.jsx';
import SignIn from './components/Auth/SignIn.jsx';
import Content from './components/Map/Content.jsx';
import getLocations from './components/helpers/getLocations.js';
import Rellax from 'rellax';

class App extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      feed: 'Home',
      spot: null,
      location: {
        lat: 28.5383,
        lng: -81.3792
      }
    }
    this.changeFeed = this.changeFeed.bind(this);
  }

  changeFeed (feed, spot) {
    this.setState({
      feed: feed,
      spot: spot
    })
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }, () => null);
  }

  render () {
    return (
      <div id='pkworld'>
        <Navigation changeFeed={this.changeFeed}/>
        <div id="feed">
          {this.state.feed === 'Home'
              ? <Home changeFeed={this.changeFeed}/>
              : null}
          {this.state.feed === 'Map'
            ? <PKMap
                location={this.state.location}
                changeFeed={this.changeFeed}/>
            :null}
          {this.state.feed === 'Users'
            ? <Users
                location={this.state.location}
                changeFeed={this.changeFeed}
                />
            :null}
          {this.state.feed === 'Events'
            ? <Events
                location={this.state.location}
                changeFeed={this.changeFeed}/>
            :null}
          {this.state.feed === 'Profile'
            ? <SignIn
                />
              :null }
          {this.state.feed === 'content'
            ? <Content spot={this.state.spot}/>
            :null}
        </div>
        {this.state.feed !== 'Home'
          ? <footer>
              <a
              style={{color: 'white'}}
              href="mailto:calebiuliano@gmail.com">Developed by Caleb Iuliano</a>
            </footer>
          : null}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));