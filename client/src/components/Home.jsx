import React from 'react';
import stride from '../assets/stride.png';
import trio from '../assets/trio2.png';
import air from '../assets/Air.png';
import imax from '../assets/imax2.png';
import gareth from '../assets/gareth.png';
import garethLay from '../assets/garethlay.png';
import eric from '../assets/eric.png';
import tampaHalf from '../assets/half.png';
import Rellax from 'rellax';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    new Rellax('.stride', {
      breakpoints: [576, 768, 1201],
      speed: 10,
      center: true,
      wrapper: '.body',
      round: false,
      vertical: true,
      horizontal: false
    })
    new Rellax('.trio', {
      breakpoints: [576, 768, 1201],
      speed: 3,
      center: false,
      wrapper: '.body',
      round: false,
      vertical: true,
      horizontal: false
    })
    new Rellax('.air', {
      breakpoints: [576, 768, 1201],
      speed: -3,
      zindex: 5,
      center: false,
      wrapper: '.body',
      round: false,
      vertical: true,
      horizontal: false
    })
    new Rellax('.imax', {
      breakpoints: [576, 768, 1201],
      speed: -2,
      center: false,
      wrapper: '.body',
      round: false,
      vertical: true,
      horizontal: false
    })
    new Rellax('.gareth', {
      breakpoints: [576, 768, 1201],
      speed: 5,
      center: false,
      wrapper: '.body',
      round: false,
      vertical: true,
      horizontal: true
    })
    new Rellax('.garethLay', {
      breakpoints: [576, 768, 1201],
      speed: 4,
      center: false,
      wrapper: '.body',
      round: false,
      vertical: true,
      horizontal: false
    })
    new Rellax('.spots', {
      breakpoints: [576, 768, 1201],
      speed: -4,
      center: false,
      wrapper: '.body',
      round: false,
      vertical: true,
      horizontal: false
    })
    new Rellax('.athletes', {
      breakpoints: [576, 768, 1201],
      speed: -5,
      center: false,
      wrapper: '.body',
      round: false,
      vertical: true,
      horizontal: false
    })
    new Rellax('.events', {
      breakpoints: [576, 768, 1201],
      speed: -9,
      center: false,
      wrapper: '.body',
      round: false,
      vertical: true,
      horizontal: false
    })
    new Rellax('.eric', {
      breakpoints: [576, 768, 1201],
      speed: -4,
      center: false,
      wrapper: '.body',
      round: false,
      vertical: true,
      horizontal: false
    })
    new Rellax('.half', {
      breakpoints: [576, 768, 1201],
      speed: 1,
      center: false,
      wrapper: '.body',
      round: false,
      vertical: true,
      horizontal: false
    })
  }

  render () {
    return (
      <div id="home" className="home">
        <h1 className="spots seeMore" onClick={() => this.props.changeFeed('Map')}>Find and Share Spots</h1>
        <h1 className="athletes seeMore" onClick={() => this.props.changeFeed('Users')}>Find Other Athletes</h1>
        <h1 className="events seeMore" onClick={() => this.props.changeFeed('Events')}>Find and Share Events</h1>
        <img className="rellax stride" alt="stride" src={stride} />
        <img className="rellax trio" alt="trio kong" src={trio} />
        <img className="rellax air" alt="air time" src={air} />
        <img className="rellax imax" alt="imax" src={imax} />
        <img className="rellax garethLay" alt="layout" src={garethLay} />
        <img className="rellax eric" alt="stride" src={eric} />
        <img className="rellax half" alt="gap flip" src={tampaHalf} />
      </div>
    )
  }
}

export default Home;

