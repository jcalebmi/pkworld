import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import EditEvent from './EditEvent.jsx';
const moment = require('moment');

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.auth = firebase.auth();
    this.state = {
      more: false,
      modal: false
    }
    this.showMore = this.showMore.bind(this);
  }

  showMore () {
    this.setState({
      more: !this.state.more
    })
  }

  render () {
    return (
      <div>
        <li className="dataLists">
          {/* {this.state.more ? */}
            <div>
              <h2>{this.props.event.name}</h2>
              <div className="contentContainer">
                <div className="contents">
                  <div className="description">
                      <h3 className="underline bold">Description:</h3> {this.props.event.description}<br/>
                      <h3 className="underline bold">Website:</h3> {this.props.event.website? <a href={this.props.event.website}>{this.props.event.website}</a> : null}<br/>
                      <h3 className="underline bold">Is this a jam?:</h3> {this.props.event.jam ? 'Yes' : 'No'}<br/>
                      <h3 className="underline bold">Is this at a gym?:</h3> {this.props.event.gym ? 'Yes' : 'No'}<br/>
                  </div>
                  <div className="address">
                     <h3 className="underline bold">Date:</h3> {moment(this.props.event.date[0]).format("MMM Do YY")} - {moment(this.props.event.date[1]).format("MMM Do YY")}<br/>
                    <h3 className="underline bold">Address:</h3> {this.props.event.address}<br/>
                    <h3 className="underline bold">City:</h3> {this.props.event.city}<br/>
                    <h3 className="underline bold">State:</h3> {this.props.event.state}<br/>
                    <h3 className="underline bold">Country:</h3> {this.props.event.country}<br/>
                  </div>
                </div>
                <br/>
                {/* <span className="bold seeMore" onClick={this.showMore}>Close</span><br/> */}
                {this.auth.currentUser && this.props.event.email === this.auth.currentUser.providerData[0].email
              ? <div id="deleteLi">
                  <div></div>
                  <span
                  className="seeMore deleteLi"
                  onClick={() => this.props.showEditModal(this.props.event)}
                  >Edit Your Event?</span>
                </div>
                : null}
              </div>
            </div>
            {/* :
            <div>
              <h3>{this.props.event.name}</h3>
              <div className="contentContainer">
                <div className="contents">
                  <p>
                  Date: {moment(this.props.event.date[0]).format("MMM Do YY")} - {moment(this.props.event.date[1]).format("MMM Do YY")}<br/>
                  Description: {this.props.event.description}<br/>
                  Website: {this.props.event.website? <a href={this.props.event.website}>{this.props.event.website}</a> : null} <br/>
                  </p>
                </div>
                <br/>
                <span
                  className="bold seeMore"
                  onClick={this.showMore}>More</span><br/>
                {this.auth.currentUser && this.props.event.email === this.auth.currentUser.providerData[0].email
              ? <div id="deleteLi">
                  <div></div>
                  <span
                  className="seeMore deleteLi"
                  onClick={()=> this.props.showEditModal(this.props.event)}
                  >Edit Your Event?</span>
                </div>
                : null}
              </div>
            </div>} */}
        </li>
      </div>
    )
  }
}

export default Event;