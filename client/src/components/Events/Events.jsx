import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';
import Event from './Event.jsx';
import SearchEvents from './SearchEvents.jsx';
import EditEvent from './EditEvent.jsx';
import SearchLocations from './SearchLocations.jsx';
import AddEvent from './AddEvent.jsx';
import EventsInfo from './EventsInfo.jsx';
import findEvents from './helpers/findEvents.js';
import getEvents from './helpers/getEvents.js';
import submitEvent from './helpers/submitEvent.js';
import editEvent from './helpers/editEvent.js';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.auth = firebase.auth();
    this.state = {
      events: [],
      display: [],
      length: 5,
      currentSearch: '',
      sortBy: 'date',
      modal: false,
      searching: false,
      searchTerm: '',
      edit: false,
      event: {},
    }
    this.loader = React.createRef(null);
    this.updateEvents = this.updateEvents.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.requestEvents = this.requestEvents.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount () {
    this.requestEvents();
  }
  requestEvents () {
    getEvents().then(data => {
      const sort = findEvents('', data, this.props.location, this.state.sortBy);

      this.setState({
      events: data,
      display: sort.slice(0, 5)
      })
    })
  }

  submitInfo (data) {
    submitEvent(data).then(res => {
      const sort = findEvents('', res, this.props.location, this.state.sortBy);
      this.setState({
        events: res,
        display: sort.slice(0, this.state.length)
        })
    });
  }

  handleEdit (id, path, data) {
    editEvent(id, path, data).then(results => {
      const sort = findEvents('', results, this.props.location, this.state.sortBy);

      this.setState({
      events: results,
      display: sort.slice(0, this.state.length)
      })
    })
  }

  updateEvents (search, length, term, sortBy) {
    let isSearching = false;
    if (length > 0) {
      isSearching = true;
      this.setState({
        display: search.slice(0),
        searching: isSearching,
        searchTerm: term,
        sortBy: sortBy
      });
    } else {
      this.setState({
        display: search.slice(0, this.state.length),
        searching: isSearching,
        searchTerm: term,
        sortBy: sortBy
      })
    }
  }

  addEvent (e) {
    if (this.state.modal) {
      this.closeModal();
      return;
    }
    this.setState({
      modal: true,
      edit: false
    });
  }
  closeModal () {
    this.setState({
      modal: false
    }, document.removeEventListener('click', this.closeModal))
  }

  showEditModal (event) {
    this.setState({
      edit: !this.state.edit,
      modal: false,
      event: event
    })
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
        {this.state.edit
          ? <EditEvent
              closeModal={this.showEditModal}
              event={this.state.event}
              handleEdit={this.handleEdit}/>
          : null}
        <EventsInfo />
        <ul className="dataLists">
          <div className="formsContainer">
              <SearchEvents
                addEvent={this.addEvent}
                changeFeed={this.props.changeFeed}
                events={this.state.events}
                updateEvents={this.updateEvents}
                location={this.props.location}/>
          </div>
          {this.state.display.map((event, index) => <Event key={index} event={event} showEditModal={this.showEditModal}/>)}
        </ul>
        <div ref={this.loader}>
        </div>
      </div>
    )
  }
}

export default Events;