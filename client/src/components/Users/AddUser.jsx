import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';


class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.auth = firebase.auth();
    this.state = {
      displayName: this.auth.currentUser.providerData[0].displayName,
      facebook: '',
      instagram: '',
      youtube: '',
      twitter: '',
      phone: '',
      email: this.auth.currentUser.providerData[0].email,
      city: '',
      state: '',
      country: '',
      pic: this.auth.currentUser.photoURL,
      host: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    const data = this.state;
    this.props.submitInfo(data);
    this.props.closeModal();
  }

  render () {
    return (
      <div id="addUser">
        <div className="formContainer popup">
          <h2>Join</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="phone">
              <input
                type="tel"
                placeholder="Phone"
                value={this.state.phone}
                name="phone"
                onChange={this.handleChange}
                />
            </label>
            <label htmlFor="facebook">
              <input
                type="url"
                placeholder="Facebook"
                value={this.state.facebook}
                name="facebook"
                onChange={this.handleChange}
                />
            </label>
            <label htmlFor="youtube">
              <input
                type="url"
                placeholder="Youtube"
                value={this.state.youtube}
                name="youtube"
                onChange={this.handleChange}
                />
            </label>
            <label htmlFor="twitter">
              <input
                type="url"
                placeholder="Twitter"
                value={this.state.twitter}
                name="twitter"
                onChange={this.handleChange}
                />
            </label>
            <label htmlFor="instagram">
              <input
                type="url"
                placeholder="Instagram"
                value={this.state.instagram}
                name="instagram"
                onChange={this.handleChange}
                />
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
            <br/>
            <h3 className="host">Host Athletes?</h3>
            <label
                className="radio"
                htmlFor="host"> Yes:
                <input
                  className="radio"
                  type="radio"
                  name="host"
                  value='true'
                  onChange={this.handleChange}></input>
              </label>
            <label
                className="radio"
                htmlFor="host"> No:
                <input
                  className="radio"
                  type="radio"
                  name="host"
                  value='false'
                  onChange={this.handleChange}></input>
              </label>
            <input type='submit'></input>
          </form><br/>
          <div
            className="closeModal"
            ><span onClick={this.props.closeModal}>+</span>
          </div>
        </div>
      </div>
    )
  }
}

export default AddUser;