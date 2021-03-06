import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';

class EventsInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="info">
        <p>
          Sort events by nearest to you or by date, search for events in the search bar, or add events to the event list. If you have location services blocked the nearest option will be sorted based on a default location rather than your own.
          </p>
      </div>
    )
  }
}

export default EventsInfo;