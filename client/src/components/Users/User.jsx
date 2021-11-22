import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import no from './assets/Boton-mal.svg';
import yes from './assets/dwcheckyes.svg';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.auth = firebase.auth();
  }

  render () {
    return (
      <li className="user dataLists">
          <div>
            <div className="userInfo">
              <div className="profilePic">
                <h3>{this.props.user.displayName}</h3>
                <img className="profilePic" src={this.props.user.pic}></img>
              </div>
              <div className="contentContainer">
                <div className="contents">
                  <span><h4 className="underline bold">City:</h4> {this.props.user.city}</span><br></br>
                  <span><h4 className="underline bold">State:</h4> {this.props.user.state}</span><br></br>
                  <span><h4 className="underline bold">Country:</h4> {this.props.user.country}</span><br/>
                  <span><h4 className="underline bold">Hosts Athletes:</h4> <br/>{this.props.user.host
                    ? <img src={yes} style={{width: '5vw', height:'auto'}}/>
                    : <img src={no} style={{width: '5vw', height:'auto'}}/>}</span>
                </div>
              </div>
            </div>
            <div className="socialMedia">
              <a href={this.props.user.youtube || null}
                className="youtube social">
                <FontAwesomeIcon icon={faYoutube} size="1x" />
              </a>
              <a href={this.props.user.facebook || null}
                className="facebook social">
                <FontAwesomeIcon icon={faFacebook} size="1x" />
              </a>
              <a href={this.props.user.twitter || null} className="twitter social">
                <FontAwesomeIcon icon={faTwitter} size="1x" />
              </a>
              <a href={this.props.user.instagram || null}
                className="instagram social">
                <FontAwesomeIcon icon={faInstagram} size="1x" />
              </a><br/>
            </div>
            {this.auth.currentUser && this.props.user.email === this.auth.currentUser.providerData[0].email
              ? <div id="deleteLi">
                  <div></div>
                  <span
                  className="seeMore deleteLi"
                  onClick={()=> this.props.showEditModal(this.props.user)}
                  >Edit Info?</span>
                </div>
                : null}
          </div>
      </li>
    )
  }
}

export default User;