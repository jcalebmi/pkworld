import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import Calendar from 'react-calendar';

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.auth = firebase.auth();
    this.state = {
      name: this.props.event.name,
      email: this.auth.currentUser.providerData[0].email,
      description: this.props.event.description,
      website: this.props.event.website,
      address: this.props.event.address,
      city: this.props.event.city,
      state: this.props.event.state,
      country: this.props.event.country,
      gym: this.props.event.gym,
      jam: this.props.event.jam,
      delete: 'edit',
      date: [new Date(this.props.event.date[0]), new Date(this.props.event.date[1])]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.onCalendarChange = this.onCalendarChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onCalendarChange(e) {
    this.setState({
      date: e
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    const data = this.state;
    this.props.handleEdit(this.props.event._id, this.state.delete, data);
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
      <div id="addEvent">
        <div className="formContainer popup">
          <h2 className="seeMore"><span
            onClick={this.edit}
            >Edit</span> |
            <span
            onClick={this.delete}> Delete</span></h2>
          {this.state.delete === 'edit'
          ? <form onSubmit={this.handleSubmit}>
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
                <br/>
                <Calendar
                  className="react-calendar"
                  tileClassName="react-calendar__tile"
                  onChange={this.onCalendarChange}
                  value={this.state.date}
                  selectRange={true}/>
                <br/>
                <input type='submit'></input>
              </form>
              : <form onSubmit={this.handleSubmit}>
                  <h2>Delete Your Event?</h2>
                  <input
                    type="submit"
                    value="Delete"></input>
                </form>}<br/>
                <div
                  className="closeModal"
                  ><span onClick={this.props.closeModal}>+</span>
                </div>
        </div>
      </div>
    )
  }
}
export default EditEvent;