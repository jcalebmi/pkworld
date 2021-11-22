import React from 'react';
import getUserInfo from './helpers/getUserInfo.js';
import AddUser from '../Users/AddUser.jsx';
import EditUser from '../Users/EditUser.jsx';
import firebase from 'firebase';
import 'firebase/auth';
import submitUser from '../Users/helpers/submitUser.js';
import editUser from '../Users/helpers/editUser.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import no from './assets/Boton-mal.svg';
import yes from './assets/dwcheckyes.svg';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.auth = firebase.auth();
    this.state = {
      user: {},
      modal: false,
      edit: false,
    }
    this.addUser = this.addUser.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  getUser () {
    getUserInfo(this.props.user.providerData[0].email)
    .then(data => this.setState({
      user: data
    }))
  }
  componentDidMount () {
    this.getUser()
  }

  submitInfo (data) {
    submitUser(data).then(res => this.getUser())
  }

  handleEdit (id, path, data) {
    editUser(id, path, data).then(results => this.getUser())
  }

  addUser (e) {
    if (this.state.modal) {
      this.closeModal();
      return;
    }
    this.setState({
      modal: true
    });
  }
  closeModal () {
    this.setState({
      modal: false,
      edit: false
    })
  }

  showEditModal () {
    this.setState({
      edit: !this.state.edit,
      modal: false,
    })
  }

  render () {
    return (
      <div id="profile">
        <div className="userInfo">
          <div className="profilePic">
            <h3>{this.auth.currentUser.providerData[0].displayName}</h3>
            <img className="profilePic" src={this.auth.currentUser.providerData[0].photoURL}></img>
          </div>
          {this.state.edit
            ? <EditUser
                closeModal={this.showEditModal}
                user={this.state.user}
                handleEdit={this.handleEdit}/>
            : null}
          {!this.state.user
          ? this.state.modal ? <AddUser
              closeModal={this.closeModal}
              modal={this.state.modal}
              submitInfo={this.submitInfo}
              /> : null
          : <div className="contentContainer">
              <div className="contents">
                <span><h3 className="underline bold">City:</h3> {this.state.user.city}</span><br></br>
                <span><h3 className="underline bold">State:</h3> {this.state.user.state}</span><br></br>
                <span><h3 className="underline bold">Country:</h3> {this.state.user.country}</span><br/>
                <span><h3 className="underline bold">Hosts Athletes:</h3> <br/>{this.state.user.host
                  ? <img src={yes} style={{width: '5vw', height:'auto'}}/>
                  : <img src={no} style={{width: '5vw', height:'auto'}}/>}</span>
              </div>
            </div>}
          </div>
          {this.state.user ?
          <div className="socialMedia">
            <a href={this.state.user.youtube || null}
              className="youtube social">
              <FontAwesomeIcon icon={faYoutube} size="1x" />
            </a>
            <a href={this.state.user.facebook || null}
              className="facebook social">
              <FontAwesomeIcon icon={faFacebook} size="1x" />
            </a>
            <a href={this.state.user.twitter || null} className="twitter social">
              <FontAwesomeIcon icon={faTwitter} size="1x" />
            </a>
            <a href={this.state.user.instagram || null}
              className="instagram social">
              <FontAwesomeIcon icon={faInstagram} size="1x" />
            </a><br/>
          </div> : null}
        {this.auth.currentUser && this.state.user && this.state.user.email === this.auth.currentUser.providerData[0].email
          ? <div id="deleteLi">
              <div></div>
              <span
              className="seeMore deleteLi"
              onClick={this.showEditModal}
              >Edit Info?</span>
            </div>
            : <div id="deleteLi">
                <div></div>
                <span
                className="seeMore deleteLi"
                onClick={this.addUser}
                >Share Your Info?</span>
              </div>}
    </div>

    )
  }
}

export default Profile;