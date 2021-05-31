import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.auth = firebase.auth();
    this.state = {
      displayName: this.auth.currentUser.displayName,
      facebook: this.props.user.facebook,
      instagram: this.props.user.instagram,
      youtube: this.props.user.youtube,
      twitter: this.props.user.twitter,
      phone: this.props.user.phone,
      email: this.auth.currentUser.email,
      city: this.props.user.city,
      state: this.props.user.state,
      country: this.props.user.country,
      pic: this.props.user.pic,
      delete: 'edit'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    const data = this.state;
    this.props.handleEdit(this.props.user._id, this.state.delete, data);
    this.props.closeModal();
  }

  edit () {
    this.setState({
      delete: 'edit'
    })
  }
  delete (e) {
    this.setState({
      delete: 'delete'
    })
  }

  render () {
    return (
      <div id="addUser">
        <div className="formContainer">
        <h2 className="seeMore"><span
            onClick={this.edit}
            >Edit</span> |
            <span
            onClick={this.delete}> Delete</span>
          </h2>
          {this.state.delete === 'edit'
          ?<form onSubmit={this.handleSubmit}>
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
            <br></br>
            <input type='submit'></input>
          </form>
          : <form onSubmit={this.handleSubmit}>
              <h2>Delete Your Info?</h2>
              <input
                type="submit"
                value="Delete"></input>
            </form>}
          <br/>
          <div
            className="closeModal"
            onClick={this.props.closeModal}>+</div>
        </div>
      </div>
    )
  }
}
export default EditUser;