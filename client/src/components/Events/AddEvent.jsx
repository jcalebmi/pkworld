import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.auth = firebase.auth();
    this.state = {
      name: '',
      email: this.auth.currentUser.email,
      description: '',
      website: '',
      address: '',
      city: '',
      state: '',
      country: '',
      gym: null,
      jam: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleLocation ({results}, address) {
    this.setState({
      address: address.split(',')[0],
      lat: results.lat,
      lng: results.lng
    });
  }
  handleSubmit (e) {
    e.preventDefault();
    const data = this.state;
    this.props.submitInfo(data);
    this.props.closeModal();
  }

  render () {
    return (
      <div id="addEvent">
        <div className="formContainer">
          <h2>Add Event</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">
              <input
                type="text"
                placeholder="Event Name"
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
                required/>
            </label>
            <label htmlFor="description">
              <input
                type="text"
                placeholder="Description"
                value={this.state.description}
                name="description"
                onChange={this.handleChange}
                required/>
            </label>
            <label htmlFor="website">
              <input
                type="url"
                placeholder="Website"
                value={this.state.website}
                name="website"
                onChange={this.handleChange}
                />
            </label>
            <label htmlFor="address">
            <input
              type="text"
              placeholder="Address"
              value={this.state.address}
              name="address"
              onChange={this.handleChange}
              required/>
            </label>
            <label htmlFor="city">
            <input
              type="text"
              placeholder="City"
              value={this.state.city}
              name="city"
              onChange={this.handleChange}
              required/>
            </label>
            <label htmlFor="state">
            <input
              type="text"
              placeholder="State"
              value={this.state.state}
              name="state"
              onChange={this.handleChange}
              required/>
            </label>
            <label htmlFor="country">
            <input
              type="text"
              placeholder="Country"
              value={this.state.country}
              name="country"
              onChange={this.handleChange}
              required/>
            </label>
            <h3>At A Gym?</h3>
            <div className="label">
              <label
                className="radio"
                htmlFor="gym">Yes:
                <input
                  className="radio"
                  type="radio"
                  name="gym"
                  value='true'
                  onChange={this.handleChange}></input>
              </label>
              <label
                className="radio"
                htmlFor="gym"> No:
                <input
                  className="radio"
                  type="radio"
                  name="gym"
                  value='false'
                  onChange={this.handleChange}></input>
              </label>
            </div>
            <h3>Is This A Jam?</h3>
            <div className="label">
              <label
                className="radio"
                htmlFor="jam">Yes:
                <input
                  className="radio"
                  type="radio"
                  name="jam"
                  value='true'
                  onChange={this.handleChange}></input>
              </label>
              <label
                className="radio"
                htmlFor="jam"> No:
                <input
                  className="radio"
                  type="radio"
                  name="jam"
                  value='false'
                  onChange={this.handleChange}></input>
              </label>
            </div>
            <br></br>
            <input type='submit'></input>
          </form><br/>
          <div
            className="closeModal"
            onClick={this.props.closeModal}>+</div>
        </div>
      </div>
    )
  }
}

export default AddEvent;