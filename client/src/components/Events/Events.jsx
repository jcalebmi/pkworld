import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';
import Event from './Event.jsx';
import SearchEvents from './SearchEvents.jsx';
import SearchLocations from './SearchLocations.jsx';
import AddEvent from './AddEvent.jsx';
import findEvents from './helpers/findEvents.js';
import getEvents from './helpers/getEvents.js';
import submitEvent from './helpers/submitEvent.js';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.auth = firebase.auth();
    this.state = {
      events: [],
      display: [],
      length: 5,
      currentSearch: '',
      modal: false,
      searching: false,
      searchTerm: ''
    }
    this.loader = React.createRef(null);
    this.updateEvents = this.updateEvents.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
  }

  componentDidMount () {
    getEvents().then(data => {
      const sort = findEvents('', data, this.props.location);

      this.setState({
      events: data,
      display: sort.slice(0, 5)
      })
    })
  }

  submitInfo (data) {
    submitEvent(data).then(res => {
      const sort = findEvents('', res, this.props.location);
      this.setState({
        events: res,
        display: sort.slice(0, length)
        })
    });
  }

  updateEvents (search, length, term) {
    let isSearching = false;
    if (length > 0) {
      isSearching = true;
      this.setState({
        display: search.slice(0),
        searching: isSearching,
        searchTerm: term
      });
    } else {
      this.setState({
        display: search.slice(0, length),
        searching: isSearching,
        searchTerm: term
      })
    }
  }

  addEvent (e) {
    if (this.state.modal) {
      this.closeModal();
      return;
    }
    this.setState({
      modal: true
    });
    // if (this.node.contains(e.target)) {
    //   return;
    // }
    // document.addEventListener('click', this.closeModal);
  }
  closeModal () {
    this.setState({
      modal: false
    }, document.removeEventListener('click', this.closeModal))
  }
/////////////////////////////////
  loadMore (entries) {
    const target = entries[0];
    if (target.isIntersecting && this.state.display.length !== this.state.events.length) {
      if (!this.state.searching) {
        const sort = findEvents('', this.state.events, this.props.location);
        this.setState({
          length: this.state.length + 2,
          display: sort.slice(0, this.state.length + 2)
        })
      }
    }
  };

  componentDidUpdate () {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: .25,
      };
      const observer = new IntersectionObserver(this.loadMore, options);

      if (this.loader && this.loader.current) {
        observer.observe(this.loader.current);
      }
      return () => observer.unobserve(this.loader.current);
  };
//////////////////////////////
  render() {
    return (
      <div id="events">
        {this.state.modal
          ? <AddEvent
              location={this.props.location}
              closeModal={this.closeModal}
              modal={this.state.modal}
              submitInfo={this.submitInfo}
              />
          : null}
        <div className="forms">
          {this.auth.currentUser
            ? <button onClick={this.addEvent}>Add Event</button>
            : <span className="seeMore" onClick={() => this.props.changeFeed('Profile')}>Sign in to add events</span>}
          <SearchEvents
            events={this.state.events}
            updateEvents={this.updateEvents}
            location={this.props.location}/>
        </div>
        <ul className="dataLists">
          {this.state.display.map((event, index) => <Event key={index} event={event}/>)}
        </ul>
        <div ref={this.loader}>
        </div>
      </div>
    )
  }
}

export default Events;